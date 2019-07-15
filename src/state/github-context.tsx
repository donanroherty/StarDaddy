import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { AuthState, User } from 'types/GithubTypes'
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
}
const GithubContext = React.createContext<GithubType | undefined>(undefined)

const GithubProvider = (props: any) => {
  const localUserData = localStorage.getItem('user')
  const [accessToken, setAccessToken] = useState<string>(
    localUserData ? JSON.parse(localUserData).token : ''
  )
  const [user, setUser] = useState<User>(
    localUserData ? JSON.parse(localUserData).user : null
  )
  const [loading, setLoading] = useState(true)
  const [authState, setAuthState] = useState(AuthState.loggedOut)

  useEffect(() => {
    localStorage.setItem(
      'user',
      JSON.stringify({
        token: accessToken,
        userData: user
      })
    )
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
      setAuthState
    }),
    [accessToken, user, loading, authState, setAuthState]
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
    setAuthState
  } = context

  const request = (endpoint: string, token?: string) => {
    return axios
      .get(`${api}${endpoint}`, {
        headers: { Authorization: `token ${token ? token : accessToken}` }
      })
      .then(res => res)
      .catch(e => e.response)
  }

  const authorize = (token: string) => {
    return request('user', token)
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
          // fetchStars()
        } else {
          reject(new Error('status failed')).catch(e => {
            setAuthState(AuthState.error)
            console.log(e, res)
          })
        }
      })
      .catch(e => {
        setAuthState(AuthState.error)
        console.log('Error:', e.response)
      })
  }

  const fetchStars = () => {
    setLoading(true)
    return request('user/starred')
      .then(res => {
        var regex = /rel="last"/

        const last: string = res.headers.link
          .split(',')
          .find((l: string) => regex.test(l))

        const lastPage = Number(
          last.substring(last.search(/page=/) + 5, last.search(/>/))
        )

        return axios.all(
          new Array(lastPage)
            .fill(undefined)
            .map((val, i) => request(`${api}user/starred?page=${i + 1}`))
        )
      })
      .then(res => {
        setLoading(false)
        console.log(res)
        // TODO: Clean data and save to state
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

  return { accessToken, authorize, user, authState, autoLogin, logout }
}

export { GithubProvider, useGithub }
