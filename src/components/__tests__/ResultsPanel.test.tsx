import React from 'react'
import ResultsPanel from '../ResultsPanel'
import { render, cleanup } from 'react-testing-library'

afterEach(() => cleanup)

test('<ResultsPanel /> renders', () => {
  const component = render(<ResultsPanel />)
  expect(component).toBeTruthy()
})
