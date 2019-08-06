import React, { useState } from 'react'
import { AuthState } from 'types/GithubTypes'

type GithubType = {
  isSyncing: boolean
  setIsSyncing: React.Dispatch<React.SetStateAction<boolean>>
  authState: AuthState
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}
export const GithubContext = React.createContext<GithubType | undefined>(
  undefined
)

export default function GithubProvider(props: any) {
  const [authState, setAuthState] = useState(AuthState.loggedOut)
  const [isSyncing, setIsSyncing] = useState(false)

  const value = React.useMemo(
    () => ({
      authState,
      setAuthState,
      isSyncing,
      setIsSyncing
    }),
    [authState, setAuthState, isSyncing]
  )
  return <GithubContext.Provider value={value} {...props} />
}
