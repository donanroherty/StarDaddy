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
import starredData from 'mock-data/stars.json'
import { queryStars, GET_USER } from 'state/github-context'

const mock = new MockAxios(axios)
afterAll(() => mock.restore())
afterEach(() => cleanup())

const GQLApi = 'https://api.github.com/graphql'

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

// Api response mocks
mock.onPost(GQLApi, { query: GET_USER }).reply(200, {
  data: {
    viewer: {
      name: 'Test Name',
      login: 'testname',
      url: 'https://github.com/testname',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/5565439?v=4'
    }
  }
})

mock
  .onPost(GQLApi, {
    query: queryStars(100, '')
  })
  .reply(200, {
    ...starredData.page1.data
  })
mock
  .onPost(GQLApi, {
    query: queryStars(100, 'Y3Vyc29yOnYyOpHOBvdfhw==')
  })
  .reply(200, {
    ...starredData.page2.data
  })
