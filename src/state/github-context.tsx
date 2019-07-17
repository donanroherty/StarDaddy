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
    return axios
      .get(`${api}${endpoint}`, {
        headers: { Authorization: `token ${accessToken}`, ...headers }
      })
      .then(res => res)
      .catch(e => e.response)
  }

  const authorize = (token: string) => {
    return request('user', { Authorization: `token ${token}` })
      .then(res => {
        if (res.status === 200) {
          setAccessToken(token)
          setUser({
            avatar_url: res.data.avatar_url,
            gists_url: res.data.gists_url,
            html_url: res.data.html_url,
            login: res.data.login,
            name: res.data.name,
            starred_url: res.data.starred_url,
            url: res.data.url
          })
          setAuthState(AuthState.loggedIn)
        } else {
          reject(new Error('status failed')).catch(e => {
            setAuthState(AuthState.loggedOut)
            console.error(e, res)
          })
        }
      })
      .catch(e => {
        setAuthState(AuthState.loggedOut)
        console.error('Error:', e.response)
      })
  }

  /**
   * Parses pagination links from GitHub /starred response and returns links fro every page
   * @param links Pagination links from header of GitHub starred response
   */
  const parseStarredLinks = (links: string) => {
    var regex = /rel="last"/
    const last = links.split(',').find((l: string) => regex.test(l)) || ''
    const lastPage = last.substring(last.search(/page=/) + 5, last.search(/>/))
    return new Array(Number(lastPage))
      .fill(undefined)
      .map((val, i) => `user/starred?page=${i + 1}`)
  }

  const fetchStars = () => {
    return request('user/starred').then(res => {
      if (res.status === 200) {
        const pages = parseStarredLinks(res.headers.link)

        axios.all(pages.map(val => request(val))).then(starData => {
          const starredRepos = starData.reduce((prev: any[], curr) => {
            const data = Object.values(curr.data)
            const mapped: StarredRepo[] = data.map((star: any) => {
              return {
                id: star.id,
                ownerLogin: star.owner.login,
                name: star.name,
                htmlUrl: star.html_url,
                description: star.description || '',
                stargazersCount: star.stargazers_count,
                forksCount: star.forks_count,
                pushedAt: star.pushed_at
              }
            })
            return [...prev, ...mapped]
          }, [])
          setStars(starredRepos)
          setLoading(false)
        })
      }
    })
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
