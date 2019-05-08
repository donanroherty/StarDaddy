import React from 'react'
import ToolPanel from '../ToolPanel'
import { render, cleanup } from 'react-testing-library'

afterEach(() => cleanup)

test('<ToolPanel /> renders', () => {
  const component = render(<ToolPanel />)
  expect(component).toBeTruthy()
})
