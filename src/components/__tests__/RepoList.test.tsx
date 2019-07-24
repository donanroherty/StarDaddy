import React from 'react'
import RepoList from '../RepoList'
import { render, cleanup } from 'utils/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { StarredRepo } from 'types/GithubTypes'
import SearchProvider from 'state/providers/SearchProvider'
import AppStateProvider from 'state/providers/AppStateProvider'

afterEach(() => cleanup())

const mockStars: StarredRepo[] = [
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

const renderComp = (term: string = '', tags: string[] = []) => {
  return render(
    <AppStateProvider value={{ stars: mockStars }}>
      <SearchProvider
        value={{
          searchTerm: term,
          searchTags: tags,
          setSearchResults: jest.fn()
        }}
      >
        <RepoList />
      </SearchProvider>
    </AppStateProvider>
  )
}

test('RepoList renders all repos for empty search term', () => {
  const { getByText } = renderComp()
  expect(getByText(mockStars[0].name)).toBeVisible()
  expect(getByText(mockStars[1].name)).toBeVisible()
  expect(getByText(mockStars[2].name)).toBeVisible()
})

test('RepoList correctly filters by search term', () => {
  const { getByText } = renderComp('react')

  expect(getByText(mockStars[0].name)).not.toBeVisible()
  expect(getByText(mockStars[1].name)).toBeVisible()
  expect(getByText(mockStars[2].name)).toBeVisible()
})

test('RepoList renders nothing for failed search term match', () => {
  const { getByText } = renderComp('react fail')
  expect(getByText(mockStars[0].name)).not.toBeVisible()
  expect(getByText(mockStars[1].name)).not.toBeVisible()
  expect(getByText(mockStars[2].name)).not.toBeVisible()
})

test('RepoList correctly filters by search term and tag', () => {
  const { getByText } = renderComp('react', ['Mock Tag'])
  expect(getByText(mockStars[0].name)).not.toBeVisible()
  expect(getByText(mockStars[1].name)).not.toBeVisible()
  expect(getByText(mockStars[2].name)).toBeVisible()
})
