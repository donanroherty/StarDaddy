import React from 'react'
import { render } from 'react-testing-library'
import theme from 'theme/theme'
import { ThemeProvider } from 'theme/themed-styled-components'
import { StarProvider } from 'state/star-context'
import { SearchProvider } from 'state/search-context'
import { TagProvider } from 'state/tag-context'
import { DndProvider } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

const GlobalProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <DndProvider backend={HTML5Backend}>
        <TagProvider>
          <SearchProvider>
            <StarProvider>{children}</StarProvider>
          </SearchProvider>
        </TagProvider>
      </DndProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: GlobalProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
