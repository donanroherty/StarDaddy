import React from 'react'
import RepoList from '../RepoList'
import { render, cleanup } from '../utils/test-utils'
import { StarredProvider } from '../../state/starred-context'

afterEach(() => cleanup())

const mockStarred = [
  {
    ownerLogin: 'testing-library',
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/49996085?v=4',
    name: 'dom-testing-library',
    htmlUrl: 'https://github.com/testing-library/dom-testing-library',
    description:
      '🐙 Simple and complete DOM testing utilities that encourage good testing practices.',
    stargazersCount: 1313,
    forksCount: 145,
    pushedAt: '2019-05-12T19:04:44Z'
  },
  {
    ownerLogin: 'gajus',
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/973543?v=4',
    name: 'write-file-webpack-plugin',
    htmlUrl: 'https://github.com/gajus/write-file-webpack-plugin',
    description:
      'Forces webpack-dev-server to write bundle files to the file system.',
    stargazersCount: 444,
    forksCount: 44,
    pushedAt: '2018-11-12T23:45:05Z'
  },
  {
    ownerLogin: 'ctimmerm',
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/40010?v=4',
    name: 'axios-mock-adapter',
    htmlUrl: 'https://github.com/ctimmerm/axios-mock-adapter',
    description: 'Axios adapter that allows to easily mock requests',
    stargazersCount: 1510,
    forksCount: 119,
    pushedAt: '2019-05-15T11:29:26Z'
  }
]

test('Renders a <Repo/> for each starred item', () => {
  const { getByText, container, rerender } = render(
    <StarredProvider value={{ starred: mockStarred, setStarred: jest.fn() }}>
      <RepoList />
    </StarredProvider>
  )
  expect(container.firstElementChild!.children.length).toBe(mockStarred.length)
  expect(getByText(mockStarred[0].name)).not.toBeNull()
  expect(getByText(mockStarred[1].name)).not.toBeNull()
  expect(getByText(mockStarred[2].name)).not.toBeNull()

  rerender(
    <StarredProvider value={{ starred: undefined, setStarred: jest.fn() }}>
      <RepoList />
    </StarredProvider>
  )
  expect(container.firstElementChild!.children.length).toBe(0)
})
