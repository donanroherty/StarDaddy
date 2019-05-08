import React from 'react'
import App from '../App'
import { render, cleanup } from 'react-testing-library'

afterEach(() => cleanup())

test('<App />', () => {
  const app = render(<App />)
  expect(app).toBeTruthy()

  const { getByTestId } = app
  expect(getByTestId('app-bar')).toBeTruthy()
  expect(getByTestId('tool-panel')).toBeTruthy()
  expect(getByTestId('results-panel')).toBeTruthy()
})
