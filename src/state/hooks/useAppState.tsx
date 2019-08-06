import React from 'react'
import { AppStateContext } from 'state/providers/AppStateProvider'

export default function useAppState() {
  const context = React.useContext(AppStateContext)
  if (!context)
    throw new Error('useAppState must be used within a AppStateProvider')

  const {
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
  } = context

  return {
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
  }
}
