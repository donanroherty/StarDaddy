import React from 'react'
import styled, {
  ThemeProvider,
  createGlobalStyle
} from '../theme/themed-styled-components'
import theme from '../theme/theme'

import AppBar from './AppBar'
import ToolPanel from './ToolPanel'
import ResultsPanel from './ResultsPanel'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Wrapper>
          <AppBar />
          <ToolPanel />
          <ResultsPanel />
        </Wrapper>
      </>
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
body{
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${theme.dark}; 
}
  #root{
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
