import React, { useState, useEffect } from 'react'
import { StarredRepo, User } from 'types/GithubTypes'
import defaultTagData from 'mock-data/default-tags.json'

type AppStateContextType = {
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User>>
  stars: StarredRepo[]
  setStars: React.Dispatch<React.SetStateAction<StarredRepo[]>>
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
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

  const localTags = localStorage.getItem('tags')
  const [tags, setTags] = useState<string[]>(
    localTags ? JSON.parse(localTags) : (defaultTagData as string[])
  )

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', accessToken)
    localStorage.setItem('stars', JSON.stringify(stars))
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [accessToken, user, stars])

  const value = React.useMemo(
    () => ({
      accessToken,
      setAccessToken,
      user,
      setUser,
      stars,
      setStars,
      tags,
      setTags
    }),
    [accessToken, user, stars, tags]
  )
  return <AppStateContext.Provider value={value} {...props} />
}
