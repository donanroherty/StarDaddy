import React, { useState } from 'react'
import { AuthState } from 'types/GithubTypes'

type GithubType = {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  authState: AuthState
  setAuthState: React.Dispatch<React.SetStateAction<AuthState>>
}
export const GithubContext = React.createContext<GithubType | undefined>(
  undefined
)

export default function GithubProvider(props: any) {
  const [authState, setAuthState] = useState(AuthState.loggedOut)

  // TODO: Add tag list items here.  Add new tags for each new language encountered on github

  const value = React.useMemo(
    () => ({
      authState,
      setAuthState
    }),
    [authState, setAuthState]
  )
  return <GithubContext.Provider value={value} {...props} />
}
