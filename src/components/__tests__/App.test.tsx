import React from 'react'
import App from '../App'
import { render, cleanup, fireEvent, waitForElement } from 'utils/test-utils'
import axios from 'axios'
import MockAxios from 'axios-mock-adapter'
import userData from 'mock-data/user.json'
import starredData from 'mock-data/stars.json'

const mock = new MockAxios(axios)
afterAll(() => mock.restore())
afterEach(() => cleanup())

mock.onGet('https://api.github.com/user').reply(200, { ...userData })
mock.onGet('https://api.github.com/user/starred').reply(
  200,
  { ...starredData.page1.data },
  {
    link:
      '<https://api.github.com/user/starred?page=2>; rel="next", <https://api.github.com/user/starred?page=2>; rel="last"'
  }
)
mock
  .onGet('https://api.github.com/user/starred?page=1')
  .reply(200, { ...starredData.page1.data })
mock
  .onGet('https://api.github.com/user/starred?page=2')
  .reply(200, { ...starredData.page2.data })

test('The correct elements are rendered when logged out', async () => {
  const { queryByTestId } = render(<App />)
  expect(queryByTestId('user-auth')).toBeTruthy()
  expect(queryByTestId('app-bar')).toBeFalsy()
  expect(queryByTestId('tool-panel')).toBeFalsy()
  expect(queryByTestId('results-panel')).toBeFalsy()
})

test('Login', async () => {
  const { getByTitle, getByText, getByTestId, queryByTestId } = render(<App />)

  fireEvent.change(getByTitle(/access token/i), {
    target: { value: 'abcdef' }
  })
  await fireEvent.click(getByText(/Login with GitHub/i))

  await waitForElement(() => getByTestId('app-bar'))

  expect(queryByTestId('user-auth')).toBeFalsy()
  expect(queryByTestId('app-bar')).toBeTruthy()
  expect(queryByTestId('tool-panel')).toBeTruthy()
  expect(queryByTestId('results-panel')).toBeTruthy()
})
