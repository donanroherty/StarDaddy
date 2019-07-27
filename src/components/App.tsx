import React, { useEffect } from 'react'
import styled, { createGlobalStyle } from 'theme/themed-styled-components'
import { AuthState } from 'types/GithubTypes'
import Panels from './Panels'
import UserAuthenticator from './UserAuthenticator'
import useGithub from 'state/hooks/useGithub'

const App: React.FC = () => {
  const { authState, autoLogin } = useGithub()

  useEffect(() => autoLogin(), [])

  return (
    <Wrapper>
      <GlobalStyle />
      {authState === AuthState.loggedIn ? <Panels /> : <UserAuthenticator />}
    </Wrapper>
  )
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700');
@import url('https://fonts.googleapis.com/css?family=Inconsolata:400,700');

body{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;

  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans',
    'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
`

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  position: fixed;
`

export default App
