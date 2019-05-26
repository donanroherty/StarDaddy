import React from 'react'
import { render } from 'react-testing-library'
import theme from '../../theme/theme'
import { ThemeProvider } from '../../theme/themed-styled-components'
import { StarProvider } from '../../state/star-context'
import { SearchProvider } from '../../state/search-context'
import { TagProvider } from '../../state/tag-context'

const GlobalProviders = ({ children }) => {
  return (
      <ThemeProvider theme={theme}>
        <TagProvider>
          <SearchProvider>
            <StarProvider>{children}</StarProvider>
          </SearchProvider>
        </TagProvider>
      </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: GlobalProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
