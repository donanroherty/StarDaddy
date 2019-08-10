import React, { useState, useEffect } from 'react'
import { StarredRepo, User } from 'types/GithubTypes'
import defaultTagData from 'mock-data/default-tags.json'

type AppStateContextType = {
  accessToken: string
  setAccessToken: React.Dispatch<React.SetStateAction<string>>
  user: User
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  stars: StarredRepo[]
  setStars: React.Dispatch<React.SetStateAction<StarredRepo[]>>
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  lastSyncDate: Date
  setLastSyncDate: React.Dispatch<React.SetStateAction<Date | null>>
}
export const AppStateContext = React.createContext<
  AppStateContextType | undefined
>(undefined)

export default function AppStateProvider(props: any) {
  const localToken = localStorage.getItem('token')
  const [accessToken, setAccessToken] = useState<string>(localToken || '')
  useEffect(() => {
    localStorage.setItem('token', accessToken)
  }, [accessToken])

  const localUser = localStorage.getItem('user')
  const [user, setUser] = useState<User | null>(
    localUser ? JSON.parse(localUser) : null
  )
  useEffect(() => {
    localStorage.setItem('user', JSON.stringify(user))
  }, [user])

  const localStars = localStorage.getItem('stars')
  const [stars, setStars] = useState<StarredRepo[]>(
    localStars ? JSON.parse(localStars) : []
  )
  useEffect(() => {
    localStorage.setItem('stars', JSON.stringify(stars))
  }, [stars])

  const localTags = localStorage.getItem('tags')
  const [tags, setTags] = useState<string[]>(
    localTags && localTags.length > 0
      ? JSON.parse(localTags)
      : (defaultTagData as string[])
  )
  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])

  const localSyncDate = localStorage.getItem('lastSyncDate')
  const [lastSyncDate, setLastSyncDate] = useState<Date | null>(
    localSyncDate ? JSON.parse(localSyncDate) : null
  )
  useEffect(() => {
    localStorage.setItem('lastSyncDate', JSON.stringify(lastSyncDate))
  }, [lastSyncDate])

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
