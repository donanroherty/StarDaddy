import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import * as serviceWorker from './serviceWorker'

import './index.css'
import { ThemeProvider } from 'theme/themed-styled-components'

import theme from 'theme/theme'

import { UserProvider } from './state/user-context'
import { GithubProvider } from 'state/github-context'
import { SearchProvider } from 'state/search-context'
import { TagProvider } from 'state/tag-context'

import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

ReactDOM.render(
  <GithubProvider>
    <UserProvider>
      <TagProvider>
        <SearchProvider>
          <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>
              <App />
            </ThemeProvider>
          </DndProvider>
        </SearchProvider>
      </TagProvider>
    </UserProvider>
  </GithubProvider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
