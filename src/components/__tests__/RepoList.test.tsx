import React from 'react'
import RepoList, {
  getSearchResults,
  sanitizeString,
  stringToArray
} from '../RepoList'
import { render as renderrtl, cleanup } from '../utils/test-utils'
import 'jest-dom/extend-expect'
import { StarProvider } from '../../state/star-context'
import { StarredRepo } from '../../types/GithubTypes'
import { SearchProvider } from '../../state/search-context'

afterEach(() => cleanup())

const mockStars: StarredRepo[] = [
  {
    id: 123,
    ownerLogin: 'testing-library',
    name: 'dom-testing-library',
    htmlUrl: 'https://github.com/testing-library/dom-testing-library',
    description:
      '🐙 Simple and complete DOM testing utilities that encourage good testing practices.',
    stargazersCount: 1313,
    forksCount: 145,
    pushedAt: '2019-05-12T19:04:44Z'
  },
  {
    id: 456,
    ownerLogin: 'gorangajic',
    name: 'react-svg-morph',
    htmlUrl: 'https://github.com/gorangajic/react-svg-morph',
    description:
      ':crystal_ball: morph your svg component one into another other',
    stargazersCount: 643,
    forksCount: 44,
    pushedAt: '2018-11-12T23:45:05Z'
  },
  {
    id: 789,
    ownerLogin: 'rehooks',
    name: 'awesome-react-hooks',
    htmlUrl: 'https://github.com/rehooks/awesome-react-hooks',
    description: 'Awesome React Hooks',
    stargazersCount: 1510,
    forksCount: 119,
    pushedAt: '2019-05-15T11:29:26Z'
  }
]

const render = (ui: any, options?: any) => {
  return renderrtl(
    <StarProvider value={{ stars: mockStars, setStars: jest.fn() }}>
      {ui}
    </StarProvider>
  )
}

test('RepoList renders all repos for empty search term', () => {
  const { getByText } = render(<RepoList />)
  expect(getByText(mockStars[0].name)).toBeVisible()
  expect(getByText(mockStars[1].name)).toBeVisible()
  expect(getByText(mockStars[2].name)).toBeVisible()
})

test('RepoList correctly filters by search term', () => {
  const { getByText } = render(
    <SearchProvider value={{ searchTerm: 'react', setSearchTerm: jest.fn() }}>
      <RepoList />
    </SearchProvider>
  )
  expect(getByText(mockStars[0].name)).not.toBeVisible()
  expect(getByText(mockStars[1].name)).toBeVisible()
  expect(getByText(mockStars[2].name)).toBeVisible()
})

test('RepoList renders nothing for failed search term match', () => {
  const { getByText } = render(
    <SearchProvider
      value={{ searchTerm: 'react fail', setSearchTerm: jest.fn() }}
    >
      <RepoList />
    </SearchProvider>
  )
  expect(getByText(mockStars[0].name)).not.toBeVisible()
  expect(getByText(mockStars[1].name)).not.toBeVisible()
  expect(getByText(mockStars[2].name)).not.toBeVisible()
})

test('getSearchResults()', () => {
  expect(getSearchResults(mockStars, 'dom')).toEqual([
    { id: 123, matches: [{ term: 'dom', count: 2 }] }
  ])

  expect(getSearchResults(mockStars, 'react')).toEqual([
    { id: 456, matches: [{ term: 'react', count: 1 }] },
    { id: 789, matches: [{ term: 'react', count: 2 }] }
  ])

  expect(getSearchResults(mockStars, 'react-svg')).toEqual([
    {
      id: 456,
      matches: [{ term: 'react', count: 1 }, { term: 'svg', count: 2 }]
    }
  ])
})

test('sanitizeString()', () => {
  expect(sanitizeString('A,b-C_d*e.f')).toBe('A b C d e f')
})

test('stringToArray()', () => {
  expect(stringToArray('A,b-C_d*e.f')).toEqual(['A', 'b', 'C', 'd', 'e', 'f'])
})
