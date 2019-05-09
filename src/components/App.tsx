import React, { useState } from 'react'
import styled, {
  ThemeProvider,
  createGlobalStyle
} from '../theme/themed-styled-components'
import theme from '../theme/theme'

import AppBar from './AppBar'
import ResultsPanel from './ResultsPanel'
import ToolPanel from './ToolPanel'

export enum ToolbarPanelOptions {
  Search,
  Settings
}

const App: React.FC = () => {
  const [activeToolbarPanel, setActiveToolbarPanel] = useState(
    ToolbarPanelOptions.Search
  )

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Wrapper>
          <AppBar
            setActiveToolbarPanel={setActiveToolbarPanel}
            activeToolbarPanel={activeToolbarPanel}
          />
          <ToolPanel activeToolbarPanel={activeToolbarPanel} />
          <ResultsPanel />
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
html{
  height: 100%;
  width: 100%;
}
body {
   height: 100%;
    width: 100%;
    margin:0;
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
    font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    color: ${theme.dark};
  }
  #root{
    width: 100%;
    height: 100%;
  }
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto 1fr;
`

export default App
