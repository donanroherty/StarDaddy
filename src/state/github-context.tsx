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

  const [loading, setLoading] = useState(true)
  const [authState, setAuthState] = useState(AuthState.loggedOut)

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', accessToken)
    localStorage.setItem('stars', JSON.stringify(stars))
  }, [accessToken, user])

  const value = React.useMemo(
    () => ({
      accessToken,
      setAccessToken,
      user,
      setUser,
      loading,
      setLoading,
      authState,
      setAuthState,
      stars,
      setStars
    }),
    [accessToken, user, loading, authState, setAuthState, stars]
  )
  return <GithubContext.Provider value={value} {...props} />
}
const api = 'https://api.github.com/'
const GQLApi = 'https://api.github.com/graphql'

const useGithub = () => {
  const context = React.useContext(GithubContext)
  if (!context)
    throw new Error('useGithub must be used within a GithubProvider')

  const {
    accessToken,
    setAccessToken,
    user,
    setUser,
    loading,
    setLoading,
    authState,
    setAuthState,
    stars,
    setStars
  } = context

  const request = (endpoint: string, headers?: any) => {
    return axios.get(`${api}${endpoint}`, {
      headers: { Authorization: `token ${accessToken}`, ...headers }
    })
  }

  const gqlRequest = (query: string, headers?: any) => {
    return axios.post(
      `${GQLApi}`,
      { query: query },
      {
        headers: { Authorization: `bearer ${accessToken}`, ...headers }
      }
    )
  }

  const GET_USER = `
    {
      viewer {
        name
        login
        url
        avatarUrl
      }
    }
  `

  const authorize = async (token: string) => {
    try {
      const res = await gqlRequest(GET_USER, {
        Authorization: `bearer ${token}`
      })

      if (res.status === 200) {
        const data = res.data.data.viewer

        setAccessToken(token)
        setUser({
          login: res.data.login,
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
      console.log(error.response)
    }
  }

  const starsQuery = (cursor: string | null) => `{
      viewer{
        starredRepositories(first:100 ${cursor ? `,after: "${cursor}"` : ``}){
          totalCount
          edges{
            cursor
            node{
              id
              name
              url
              owner {
                login
              }
              description
              stargazers{
                totalCount
              }
              forkCount
              pushedAt
              languages(first: 5) {
                nodes {
                  name
                }
              }
            }
          }
        }
      }
    }`

  const fetchStars = () => fetchData(null, [], 0)

  const fetchData = async (
    cursor: string | null,
    prev: StarredRepo[],
    i: number
  ) => {
    try {
      const res = await gqlRequest(starsQuery(cursor))
      const starredRepositories = res.data.data.viewer.starredRepositories
      const loopCount = Math.ceil(starredRepositories.totalCount / 100) //100 items per page
      const lastCursor =
        starredRepositories.edges[starredRepositories.edges.length - 1].cursor

      const repos: StarredRepo[] = starredRepositories.edges.map(
        (star: any) => ({
          id: star.node.id,
          ownerLogin: star.node.owner.login,
          name: star.node.name,
          htmlUrl: star.node.url,
          description: star.node.description || '',
          stargazersCount: star.node.stargazers.totalCount,
          forksCount: star.node.forkCount,
          pushedAt: star.node.pushedAt,
          languages: star.node.languages.nodes
        })
      )

      prev = [...prev, ...repos]

      if (++i < loopCount) {
        fetchData(lastCursor, prev, i)
      } else {
        setStars(prev.reverse())
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const autoLogin = () => {
    if (accessToken !== '') {
      authorize(accessToken)
    }
  }

  const logout = () => {
    setAuthState(AuthState.loggedOut)
    setAccessToken('')
  }

  return {
    accessToken,
    authorize,
    user,
    authState,
    autoLogin,
    logout,
    fetchStars,
    stars
  }
}

export { GithubProvider, useGithub }
