import { render, cleanup } from 'utils/test-utils'
import { getCombinedSearch } from '../useSearch'
import { StarredRepo } from 'types/GithubTypes'

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
    tags: ['C++', 'Shell', 'HTML']
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
    tags: ['JavaScript']
  }
]

test('getSearchResults()', () => {
  expect(getCombinedSearch(mockStars, 'dom', [])).toEqual([
    {
      id: '123',
      name: 'dom-testing-library',
      termMatches: [{ term: 'dom', count: 2 }],
      tagMatches: [],
      searchRanking: 1
    }
  ])

  expect(getCombinedSearch(mockStars, 'react', [])).toEqual([
    {
      id: '456',
      name: 'react-svg-morph',
      termMatches: [{ term: 'react', count: 1 }],
      tagMatches: [],
      searchRanking: 1
    },
    {
      id: '789',
      name: 'awesome-react-hooks',
      termMatches: [{ term: 'react', count: 2 }],
      tagMatches: [],
      searchRanking: 1
    }
  ])

  expect(getCombinedSearch(mockStars, 'react-svg', [])).toEqual([
    {
      id: '456',
      name: 'react-svg-morph',
      termMatches: [{ term: 'react', count: 1 }, { term: 'svg', count: 2 }],
      tagMatches: [],
      searchRanking: 2
    }
  ])
})
