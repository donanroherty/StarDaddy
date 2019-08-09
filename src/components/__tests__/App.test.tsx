import React from 'react'
import App from '../App'
import { render, cleanup, fireEvent, waitForElement } from 'utils/test-utils'
import mockGithubResponses from 'utils/mockGithubResponses'

const mock = mockGithubResponses()
afterAll(() => mock.restore())

afterEach(() => cleanup())

test('Login', async () => {
  const { getByTitle, getByText, getByTestId, queryByTestId, debug } = render(
    <App />
  )
  fireEvent.change(getByTitle(/access token/i), {
    target: { value: 'abcdef' }
  })
  fireEvent.click(getByText(/Authenticate/i))
  await waitForElement(() => getByTestId('app-bar'))
  expect(queryByTestId('user-auth')).toBeFalsy()
  expect(queryByTestId('app-bar')).toBeTruthy()
  expect(queryByTestId('search-panel')).toBeTruthy()
  expect(queryByTestId('results-panel')).toBeTruthy()
  expect(queryByTestId('repo-list')).toBeTruthy()
})
