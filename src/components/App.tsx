import React, { useEffect } from 'react'
import { createGlobalStyle } from 'theme/themed-styled-components'
import { AuthState } from 'types/GithubTypes'
import Panels from './Panels'
import UserAuthenticator from './UserAuthenticator'
import useGithub from 'state/hooks/useGithub'

const App: React.FC = () => {
  const { authState, autoLogin } = useGithub()

  useEffect(() => autoLogin(), [])

  return (
    <>
      <GlobalStyle />
      {authState === AuthState.loggedIn ? <Panels /> : <UserAuthenticator />}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700');
`

export default App
