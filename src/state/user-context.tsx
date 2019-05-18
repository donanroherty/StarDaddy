import React, { useState } from 'react'
import { User } from '../types/GithubTypes'
import mockData from '../mock-data/user.json'

type UserContextValue = {
  user: User | undefined
  setUser: (user: User | undefined) => void
}
const UserContext = React.createContext<UserContextValue | undefined>(undefined)

const UserProvider = (props: any) => {
  const [user, setUser] = useState()

  const value = React.useMemo(() => ({ user, setUser }), [user])
  return <UserContext.Provider value={value} {...props} />
}

const useUser = () => {
  const context = React.useContext(UserContext)
  if (!context) throw new Error('useUser must be used within a UserProvider')

  const { user, setUser } = context

  const handleUserLoggedIn = (data: any) => {
    setUser(data)
    localStorage.setItem('user-data', JSON.stringify(data))
    console.log(`Logged in as ${data.login}`)
  }

  const handleAuthFailure = (error: string) => {
    console.log('Auth failed:', error)
  }

  const authorize = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(mockData)
      }, 500)
    })
      .then(data => handleUserLoggedIn(mockData))
      .catch(e => {
        handleAuthFailure(e)
      })
  }

  const logout = () => {
    localStorage.clear()
    setUser(undefined)
  }

  return { user, authorize, logout }
}

export { UserProvider, useUser }
