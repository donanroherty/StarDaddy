import React, { useState } from 'react'
import styled, {
  ThemeProvider,
  createGlobalStyle
} from 'theme/themed-styled-components'
import theme from 'theme/theme'

import AppBar from './AppBar'
import ResultsPanel from './ResultsPanel'
import ToolPanel from './ToolPanel'
import UserAuthenticator from './UserAuthenticator'

import { useUser } from 'state/user-context'
import { SearchProvider } from 'state/search-context'
import { TagProvider } from 'state/tag-context'

export enum ToolbarPanelOptions {
  Search,
  Settings
}

const App: React.FC = () => {
  const [activeToolbarPanel, setActiveToolbarPanel] = useState(
    ToolbarPanelOptions.Search
  )
  const { user, authorize } = useUser()

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        {user ? (
          <MainPanels>
            <AppBar
              setActiveToolbarPanel={setActiveToolbarPanel}
              activeToolbarPanel={activeToolbarPanel}
            />
            <TagProvider>
              <SearchProvider>
                <ToolPanel activeToolbarPanel={activeToolbarPanel} />
                <ResultsPanel />
              </SearchProvider>
            </TagProvider>
          </MainPanels>
        ) : (
          <UserAuthenticator authorize={authorize} />
        )}
      </>
    </ThemeProvider>
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
