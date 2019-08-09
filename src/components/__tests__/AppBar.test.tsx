import React from 'react'
import AppBar from '../AppBar'
import { render, cleanup, fireEvent } from 'utils/test-utils'
import { StarredRepo } from 'types/GithubTypes'
import AppStateProvider from 'state/providers/AppStateProvider'
import '@testing-library/jest-dom/extend-expect'

afterEach(() => cleanup())

const setActiveToolbarPanel = jest.fn()

const mockUser = {
  login: 'donanroherty',
  id: 5565439,
  node_id: 'MDQ6VXNlcjU1NjU0Mzk=',
  avatar_url: 'https://avatars3.githubusercontent.com/u/5565439?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/donanroherty',
  html_url: 'https://github.com/donanroherty',
  followers_url: 'https://api.github.com/users/donanroherty/followers',
  following_url:
    'https://api.github.com/users/donanroherty/following{/other_user}',
  gists_url: 'https://api.github.com/users/donanroherty/gists{/gist_id}',
  starred_url:
    'https://api.github.com/users/donanroherty/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/donanroherty/subscriptions',
  organizations_url: 'https://api.github.com/users/donanroherty/orgs',
  repos_url: 'https://api.github.com/users/donanroherty/repos',
  events_url: 'https://api.github.com/users/donanroherty/events{/privacy}',
  received_events_url:
    'https://api.github.com/users/donanroherty/received_events',
  type: 'User',
  site_admin: false,
  name: 'Ronan Doherty',
  company: null,
  blog: '',
  location: 'Ireland',
  email: 'donanroherty@gmail.com',
  hireable: null,
  bio: null,
  public_repos: 8,
  public_gists: 1,
  followers: 2,
  following: 10,
  created_at: '2013-09-28T17:40:56Z',
  updated_at: '2019-05-05T17:43:22Z'
}

const mockRepos: StarredRepo[] = [
  {
    id: '123',
    ownerLogin: 'testing-library',
    name: 'dom-testing-library',
    htmlUrl: 'https://github.com/testing-library/dom-testing-library',
    description:
      '🐙 Simple and complete DOM testing utilities that encourage good testing practices.',
    stargazersCount: 1313,
    forksCount: 145,
    pushedAt: '2019-05-12T19:04:44Z',
    tags: []
  },
  {
    id: '456',
    ownerLogin: 'gorangajic',
    name: 'react-svg-morph',
    htmlUrl: 'https://github.com/gorangajic/react-svg-morph',
    description:
      ':crystal_ball: morph your svg component one into another other',
    stargazersCount: 643,
    forksCount: 44,
    pushedAt: '2018-11-12T23:45:05Z',
    tags: []
  },
  {
    id: '789',
    ownerLogin: 'rehooks',
    name: 'awesome-react-hooks',
    htmlUrl: 'https://github.com/rehooks/awesome-react-hooks',
    description: 'Awesome React Hooks',
    stargazersCount: 1510,
    forksCount: 119,
    pushedAt: '2019-05-15T11:29:26Z',
    tags: ['Mock Tag']
  }
]

test('Clicking settings button opens the settings menu', () => {
  const { getByTestId } = render(
    <AppStateProvider
      value={{
        user: mockUser,
        stars: mockRepos
      }}
    >
      <AppBar />
    </AppStateProvider>
  )
  expect(getByTestId('settings-btn')).toBeTruthy()
  expect(getByTestId('settings-menu')).toBeTruthy()
  expect(getByTestId('settings-menu')).not.toBeVisible()

  fireEvent.click(getByTestId('settings-btn')) // Open menu
  expect(getByTestId('settings-menu')).toBeVisible()

  fireEvent.click(getByTestId('settings-btn')) // Close menu
  expect(getByTestId('settings-menu')).not.toBeVisible()
})
