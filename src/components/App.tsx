import React from 'react'
import {
  ThemeProvider,
  createGlobalStyle
} from '../theme/themed-styled-components'
import { theme } from '../theme/theme'

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <div>
        <GlobalStyle />
        App
      </div>
    </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
body{
  margin: 0;
  padding: 0;
  @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: ${theme.dark}; 
}   
  :root {
    height: 100%;
  }
  #root{
    height: 100%;
  }
`

export default App
