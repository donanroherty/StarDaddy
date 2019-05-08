import React from 'react'
import AppBar from '../AppBar'
import { render, cleanup } from 'react-testing-library'

afterEach(() => cleanup)

test('<AppBar /> renders', () => {
  const component = render(<AppBar />)
  expect(component).toBeTruthy()
})
