import React from 'react'
import Repo, { RepoProps } from '../Repo'
import { render, cleanup } from '../utils/test-utils'

afterEach(() => cleanup())

const repoProps: RepoProps = {
  ownerLogin: 'owner',
  ownerAvatarUrl: 'www.avatarurl.mock',
  name: 'repo-name',
  htmlUrl: 'www.repoaddress.mock',
  description: 'repo description',
  stargazersCount: 50,
  forksCount: 10,
  pushedAt: '2018-11-12T23:45:05Z'
}

test('Renders correct content', () => {
  const { getByTitle, getByAltText, getByText, rerender } = render(
    <Repo {...repoProps} />
  )
  expect(getByAltText('avatar').getAttribute('src')).toBe(
    repoProps.ownerAvatarUrl
  )
  expect(getByTitle('title').innerHTML).toBe(
    'owner / <strong>repo-name</strong>'
  )
  expect(getByTitle('title').getAttribute('href')).toBe(repoProps.htmlUrl)
  expect(getByText(repoProps.description)).not.toBeNull()

  expect(getByTitle('star-count').lastElementChild!.innerHTML).toBe(
    repoProps.stargazersCount.toString()
  )
  expect(getByTitle('star-count').getAttribute('href')).toBe(
    repoProps.htmlUrl + '/stargazers'
  )
  expect(getByTitle('fork-count').lastElementChild!.innerHTML).toBe(
    repoProps.forksCount.toString()
  )
  expect(getByTitle('fork-count').getAttribute('href')).toBe(
    repoProps.htmlUrl + '/network/members'
  )

  expect(getByText('Updated on Nov 12, 2018')).not.toBeNull()
  rerender(<Repo {...repoProps} pushedAt="2019-05-12T19:04:44Z" />)
  expect(getByText('Updated 7 days ago')).not.toBeNull()
})
