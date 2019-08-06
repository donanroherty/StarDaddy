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
  lastSyncDate: Date
  setLastSyncDate: React.Dispatch<React.SetStateAction<Date>>
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
  const localSyncDate = localStorage.getItem('lastSyncDate')
  const [lastSyncDate, setLastSyncDate] = useState<Date | null>(
    localSyncDate ? JSON.parse(localSyncDate) : null
  )

  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', accessToken)
    localStorage.setItem('stars', JSON.stringify(stars))
    localStorage.setItem('tags', JSON.stringify(tags))
    localStorage.setItem('lastSyncDate', JSON.stringify(lastSyncDate))
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
      setTags,
      lastSyncDate,
      setLastSyncDate
    }),
    [accessToken, user, stars, tags, lastSyncDate]
  )
  return <AppStateContext.Provider value={value} {...props} />
}
