import React from 'react'
import { AppStateContext } from 'state/providers/AppStateProvider'

export default function useAppState() {
  const context = React.useContext(AppStateContext)
  if (!context)
    throw new Error('useGithub must be used within a GithubProvider')

  const {
    accessToken,
    setAccessToken,
    user,
    setUser,
    stars,
    setStars
  } = context

  return {
    accessToken,
    setAccessToken,
    user,
    setUser,
    stars,
    setStars
  }
}
