import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthState, User, StarredRepo } from 'types/GithubTypes'
import { reject } from 'q'

type GithubType = {
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  authState: AuthState
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
  stars: StarredRepo[]
  setStars: React.Dispatch<React.SetStateAction<StarredRepo[]>>
}
const GithubContext = React.createContext<GithubType | undefined>(undefined)

const GithubProvider = (props: any) => {
  const localToken = localStorage.getItem('token')
  const [accessToken, setAccessToken] = useState<string>(localToken || '')
  const localUser = localStorage.getItem('user')
  const [user, setUser] = useState<User>(
    localUser ? JSON.parse(localUser) : null
  )
  const localStars = localStorage.getItem('stars')
  const [stars, setStars] = useState<StarredRepo[]>(
    localStars ? JSON.parse(localStars) : []
  )

  const [authState, setAuthState] = useState(AuthState.loggedOut)

  // TODO: Add tag list items here.  Add new tags for each new language encountered on github

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', accessToken)
    localStorage.setItem('stars', JSON.stringify(stars))
  }, [accessToken, user, stars])

  const value = React.useMemo(
    () => ({
      accessToken,
      setAccessToken,
      user,
      setUser,
      authState,
      setAuthState,
      stars,
      setStars
    }),
    [accessToken, user, authState, setAuthState, stars]
  )
  return <GithubContext.Provider value={value} {...props} />
}

const GQLApi = 'https://api.github.com/graphql'

export const GET_USER = `{viewer {name login url avatarUrl}}`
export const queryStars = (batchSize: number, cursor: string) => `{
      viewer{
        starredRepositories(first:${batchSize} ${
  cursor.length > 0 ? `,after: "${cursor}"` : ``
}){
          totalCount
          edges{
            cursor
            node{
              id
              name
              url
              owner {login}
              description
              stargazers{totalCount}
              forkCount
              pushedAt
              languages(last: 50) {
                totalSize
                edges {
                  node {name}
                  size
                }
              }
            }
          }
        }
      }
    }`

const useGithub = () => {
  const context = React.useContext(GithubContext)
  if (!context)
    throw new Error('useGithub must be used within a GithubProvider')

  const {
    accessToken,
    setAccessToken,
    user,
    setUser,
    authState,
    setAuthState,
    stars,
    setStars
  } = context

  const gqlRequest = (query: string, headers?: any) => {
    return axios.post(
      `${GQLApi}`,
      { query: query },
      {
        headers: { Authorization: `bearer ${accessToken}`, ...headers }
      }
    )
  }

  const authorize = async (token: string) => {
    try {
      const res = await gqlRequest(GET_USER, {
        Authorization: `bearer ${token}`
      })

      if (res.status === 200) {
        const data = res.data.data.viewer
        setAccessToken(token)
        setUser({
          login: data.login,
          name: data.name,
          url: data.url,
          avatar_url: data.avatarUrl
        })
        setAuthState(AuthState.loggedIn)
      } else {
        reject(new Error('status failed')).catch(e => {
          setAuthState(AuthState.loggedOut)
          console.error(e, res)
        })
      }
    } catch (error) {
      setAuthState(AuthState.loggedOut)
      console.error(error)
    }
  }

  const fetchStars = async (
    accumulator: StarredRepo[] = [],
    i: number = 0,
    cursor: string = '',
    batchSize: number = 100
  ) => {
    try {
      if (batchSize > 100 || batchSize < 0)
        throw 'batchSize must be between -1 and 101'

      const res = await gqlRequest(queryStars(batchSize, cursor))

      const repos = res.data.data.viewer.starredRepositories
      const loopCount = Math.ceil(repos.totalCount / batchSize)

      cursor = repos.edges[repos.edges.length - 1].cursor
      accumulator = [...accumulator, ...repos.edges.map((s: any) => s.node)]

      if (++i < loopCount) {
        fetchStars(accumulator, i, cursor)
      } else {
        const repos = cleanStarData(accumulator, stars)
        setStars(repos.reverse())
      }
    } catch (error) {
      console.error(error)
    }
  }

  const renameTagOnRepo = (prevName: string, newName: string) => {
    setStars(prev =>
      prev.map(star => ({
        ...star,
        tags: star.tags.map(tag => (tag === prevName ? newName : tag))
      }))
    )
  }

  const autoLogin = () => {
    if (accessToken !== '') {
      authorize(accessToken)
    }
  }

  const logout = () => {
    setAuthState(AuthState.loggedOut)
    setAccessToken('')
    window.localStorage.clear()
  }

  return {
    accessToken,
    authorize,
    user,
    authState,
    autoLogin,
    logout,
    fetchStars,
    stars,
    renameTagOnRepo
  }
}

export const cleanStarData = (starData: any[], localStars: StarredRepo[]) => {
  const repos: StarredRepo[] = starData.map((star: any) => {
    const existing = localStars.find(s => s.id === star.id)
    const totalSize = star.languages.totalSize
    const inclusionPerc = 15.0 // Percentage threshold for language to be included as a tag

    let languages = []

    if (star.languages.edges) {
      languages = star.languages.edges
        .map((l: any) => {
          return {
            name: l.node.name,
            size: l.size,
            perc: (l.size / totalSize) * 100
          }
        })
        .filter((l: any) => l.perc > inclusionPerc)
        .map((l: any) => l.name)
    }

    const tags = existing ? existing.tags : languages

    return {
      id: star.id,
      ownerLogin: star.owner.login,
      name: star.name,
      htmlUrl: star.url,
      description: star.description || '',
      stargazersCount: star.stargazers.totalCount,
      forksCount: star.forkCount,
      pushedAt: star.pushedAt,
      tags: tags
    }
  })

  return repos
}

export { GithubProvider, useGithub }
