import React from 'react'
import App from '../App'
import {
  render,
  cleanup,
  fireEvent,
  waitForElement,
  wait
} from 'utils/test-utils'
import axios from 'axios'
import MockAxios from 'axios-mock-adapter'
import userData from 'mock-data/user.json'

const mock = new MockAxios(axios)
afterAll(() => mock.restore())

afterEach(() => cleanup())

test('The correct elements are rendered when logged out', async () => {
  const { queryByTestId } = render(<App />)

  expect(queryByTestId('user-auth')).toBeTruthy()
  expect(queryByTestId('app-bar')).toBeFalsy()
  expect(queryByTestId('tool-panel')).toBeFalsy()
  expect(queryByTestId('results-panel')).toBeFalsy()
})

test('Authentication', async () => {
  mock.onGet('https://api.github.com/user').reply(200, {
    ...userData
  })

  const { getByTitle, getByText, getByTestId, queryByTestId } = render(<App />)

  expect(queryByTestId('user-auth')).toBeTruthy()
  expect(queryByTestId('app-bar')).toBeFalsy()
  expect(queryByTestId('tool-panel')).toBeFalsy()
  expect(queryByTestId('results-panel')).toBeFalsy()

  fireEvent.change(getByTitle(/access token/i), {
    target: { value: 'abcdef' }
  })
  await fireEvent.click(getByText(/Login with GitHub/i))

  const appBar = await waitForElement(() => getByTestId('app-bar'))

  expect(queryByTestId('user-auth')).toBeFalsy()
  expect(queryByTestId('app-bar')).toBeTruthy()
  expect(queryByTestId('tool-panel')).toBeTruthy()
  expect(queryByTestId('results-panel')).toBeTruthy()

  // debug()
})
