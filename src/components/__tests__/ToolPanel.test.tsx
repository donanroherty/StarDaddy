import React from 'react'
import ToolPanel, { ToolPanelProps } from '../ToolPanel'
import { render, cleanup } from 'react-testing-library'
import { ToolbarPanelOptions } from '../App'

afterEach(() => cleanup())

const toolPanelProps: ToolPanelProps = {
  activeToolbarPanel: ToolbarPanelOptions.Search
}

test('<ToolPanel /> renders', () => {
  const component = render(<ToolPanel {...toolPanelProps} />)
  expect(component).toBeTruthy()
})
