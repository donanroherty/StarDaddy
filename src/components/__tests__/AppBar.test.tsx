import React from 'react'
import AppBar from '../AppBar'
import { render, cleanup } from 'react-testing-library'
import { ThemeProvider } from '../../theme/themed-styled-components'
import theme from '../../theme/theme'

afterEach(() => cleanup())

test('<AppBar /> renders', () => {
  const component = render(
    <ThemeProvider theme={theme}>
      <AppBar />
    </ThemeProvider>
  )
  expect(component).toBeTruthy()

  const { getByTitle } = component
  expect(getByTitle('Settings')).toBeTruthy()
})
