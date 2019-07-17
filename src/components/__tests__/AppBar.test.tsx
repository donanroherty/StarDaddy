import React from 'react'
import AppBar from '../AppBar'
import Panels from '../Panels'
import { render, cleanup, fireEvent } from 'utils/test-utils'
import { ToolbarPanelOptions } from '../Panels'
import userData from 'mock-data/user.json'
import { GithubProvider } from 'state/github-context'

afterEach(() => cleanup())

const setActiveToolbarPanel = jest.fn()

test('AppBar buttons open correct panels', () => {
  const { getByTestId, getByTitle, debug } = render(
    <GithubProvider
      value={{
        user: userData
      }}
    >
      <Panels />
    </GithubProvider>
  )

  expect(getByTestId('search-tool-panel')).toBeTruthy()
  fireEvent.click(getByTitle('Settings'))
  expect(getByTestId('settings-tool-panel')).toBeTruthy()
  fireEvent.click(getByTitle('Search'))
  expect(getByTestId('search-tool-panel')).toBeTruthy()
})

test('Clicking buttons calls correct functions', () => {
  const { getByTitle } = render(
    <AppBar
      setActiveToolbarPanel={setActiveToolbarPanel}
      activeToolbarPanel={ToolbarPanelOptions.Search}
    />
  )
  fireEvent.click(getByTitle('Settings'), ToolbarPanelOptions.Settings)
  expect(setActiveToolbarPanel).toHaveBeenCalledTimes(1)
  expect(setActiveToolbarPanel).toHaveBeenCalledWith(
    ToolbarPanelOptions.Settings
  )
  fireEvent.click(getByTitle('Search'), ToolbarPanelOptions.Search)
  expect(setActiveToolbarPanel).toHaveBeenCalledTimes(2)
  expect(setActiveToolbarPanel).toHaveBeenCalledWith(ToolbarPanelOptions.Search)
})
