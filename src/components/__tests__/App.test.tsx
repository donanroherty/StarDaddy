import React from 'react'
import App from '../App'
import { render, cleanup } from 'react-testing-library'

afterEach(() => cleanup)

it('<App /> renders', () => {
  const component = render(<App />)
  expect(component).toBeTruthy()

  component.debug()
})
