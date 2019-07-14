import React, { useState, useEffect } from 'react'
import styled, { createGlobalStyle } from 'theme/themed-styled-components'
import { AuthState } from 'types/GithubTypes'

import AppBar from './AppBar'
import ResultsPanel from './ResultsPanel'
import ToolPanel from './ToolPanel'
import UserAuthenticator from './UserAuthenticator'

import { useGithub } from 'state/github-context'

export enum ToolbarPanelOptions {
  Search,
  Settings
}

const App: React.FC = () => {
  const [activeToolbarPanel, setActiveToolbarPanel] = useState(
    ToolbarPanelOptions.Search
  )

  const { authState, autoLogin } = useGithub()

  useEffect(() => {
    autoLogin()
  }, [])

  return (
    <>
      <GlobalStyle />
      {authState === AuthState.loggedIn ? (
        <MainPanels>
          <AppBar
            setActiveToolbarPanel={setActiveToolbarPanel}
            activeToolbarPanel={activeToolbarPanel}
          />
          <ToolPanel activeToolbarPanel={activeToolbarPanel} />
          <ResultsPanel />
        </MainPanels>
      ) : (
        <UserAuthenticator />
      )}
    </>
  )
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css?family=PT+Sans+Narrow:400,700');
@import url('https://fonts.googleapis.com/css?family=Open+Sans:400,400i,600,700');
`

const MainPanels = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto 1fr;
`

export default App
