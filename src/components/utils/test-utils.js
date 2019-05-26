import React from 'react'
import { render } from 'react-testing-library'
import theme from '../../theme/theme'
import { ThemeProvider } from '../../theme/themed-styled-components'
import { StarProvider } from '../../state/star-context'
import { SearchProvider } from '../../state/search-context'

const GlobalProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <StarProvider>{children}</StarProvider>
      </SearchProvider>
    </ThemeProvider>
  )
}

const customRender = (ui, options) =>
  render(ui, { wrapper: GlobalProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
