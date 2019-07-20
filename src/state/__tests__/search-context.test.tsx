import { render, cleanup } from 'utils/test-utils'
import { getSearchResults } from '../search-context'
import { StarredRepo } from 'types/GithubTypes'

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
    pushedAt: '2019-05-12T19:04:44Z',
    tags: []
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
    pushedAt: '2018-11-12T23:45:05Z',
    tags: []
  },
  {
    id: 789,
    ownerLogin: 'rehooks',
    name: 'awesome-react-hooks',
    htmlUrl: 'https://github.com/rehooks/awesome-react-hooks',
    description: 'Awesome React Hooks',
    stargazersCount: 1510,
    forksCount: 119,
    pushedAt: '2019-05-15T11:29:26Z',
    tags: []
  }
]

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
