import React, { useState, useEffect } from 'react'
import { StarredRepo, User } from 'types/GithubTypes'

type AppStateContextType = {
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  stars: StarredRepo[]
  setStars: React.Dispatch<React.SetStateAction<StarredRepo[]>>
}
export const AppStateContext = React.createContext<
  AppStateContextType | undefined
>(undefined)

export default function AppStateProvider(props: any) {
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
      stars,
      setStars
    }),
    [accessToken, user, stars]
  )
  return <AppStateContext.Provider value={value} {...props} />
}
