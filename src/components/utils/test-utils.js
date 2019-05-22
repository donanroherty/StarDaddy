import React from 'react'
import { render } from 'react-testing-library'
import { ThemeProvider } from '../../theme/themed-styled-components'
import theme from '../../theme/theme'
import { ThemeProvider } from '../../theme/themed-styled-components'
import { StarProvider } from '../../state/star-context'

const GlobalProviders = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>
        <StarProvider>{children}</StarProvider>
}

const customRender = (ui, options) =>
  render(ui, { wrapper: GlobalProviders, ...options })

// re-export everything
export * from 'react-testing-library'

// override render method
export { customRender as render }
