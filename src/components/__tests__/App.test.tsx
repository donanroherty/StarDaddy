import React from 'react'
import App from '../App'
import { render, cleanup } from '../utils/test-utils'
import { UserProvider } from '../../state/user-context'
import user from '../../mock-data/user.json'

afterEach(() => cleanup())

const setUser = jest.fn()

test('Renders correct elements is a user is or is not logged in', () => {
  const { queryByTestId, rerender } = render(
    <UserProvider value={{ user: undefined, setUser: setUser }}>
      <App />
    </UserProvider>
  )
  expect(queryByTestId('app-bar')).toBeNull()
  expect(queryByTestId('tool-panel')).toBeNull()
  expect(queryByTestId('results-panel')).toBeNull()
  expect(queryByTestId('user-setup-modal')).not.toBeNull()

  rerender(
    <UserProvider value={{ user: user, setUser: setUser }}>
      <App />
    </UserProvider>
  )
  expect(queryByTestId('app-bar')).not.toBeNull()
  expect(queryByTestId('tool-panel')).not.toBeNull()
  expect(queryByTestId('results-panel')).not.toBeNull()
  expect(queryByTestId('user-setup-modal')).toBeNull()
})
