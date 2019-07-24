import React from 'react'
import { render } from '@testing-library/react'
import theme from 'theme/theme'
import { ThemeProvider } from 'theme/themed-styled-components'
import SearchProvider from 'state/providers/SearchProvider'
import TagProvider from 'state/providers/TagProvider'
import AppStateProvider from 'state/providers/AppStateProvider'
import GithubProvider from 'state/providers/GithubProvider'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const GlobalProviders = ({ children }) => (
  <AppStateProvider>
    <GithubProvider>
      <TagProvider>
        <SearchProvider>
          <DndProvider backend={HTML5Backend}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
          </DndProvider>
        </SearchProvider>
      </TagProvider>
    </GithubProvider>
  </AppStateProvider>
)

const customRender = (ui, options) =>
  render(ui, { wrapper: GlobalProviders, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render }
