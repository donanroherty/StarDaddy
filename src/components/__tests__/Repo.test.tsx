import React from 'react'
import Repo from '../Repo'
import { render } from 'utils/test-utils'
import { StarredRepo } from 'types/GithubTypes'

const repoMock: StarredRepo = {
  id: '100',
  ownerLogin: 'owner',
  name: 'repo-name',
  htmlUrl: 'www.repoaddress.mock',
  description: 'repo description',
  stargazersCount: 50,
  forksCount: 10,
  pushedAt: '2018-11-12T23:45:05Z',
  tags: ['TagName1', 'TagName2']
}

const styleMock: React.CSSProperties = {}

describe('<Repo/> Renders correct content', () => {
  const { getByTestId, getAllByTestId, getByText } = render(
    <Repo repo={repoMock} style={styleMock} />
  )

  test('Title is rendered correctly and has correct link href', () => {
    expect(getByTestId('title').innerHTML).toBe(
      'owner / <strong>repo-name</strong>'
    )
    expect(getByTestId('title').getAttribute('href')).toBe(repoMock.htmlUrl)
  })

  test('Description renders correct text', () => {
    expect(getByText(repoMock.description)).not.toBeNull()
  })

  test('Tags are displayed', () => {
    expect(getAllByTestId('tag').length).toBe(2)
    expect(getByText('TagName1')).not.toBeNull()
    expect(getByText('TagName2')).not.toBeNull()
  })

  test('Star count is displayed and has correct link href', () => {
    expect(getByTestId('star-count').lastElementChild!.innerHTML).toBe(
      repoMock.stargazersCount.toString()
    )
    expect(getByTestId('star-count').getAttribute('href')).toBe(
      repoMock.htmlUrl + '/stargazers'
    )
  })

  test('Fork count is displayed and has correct link href', () => {
    expect(getByTestId('fork-count').lastElementChild!.innerHTML).toBe(
      repoMock.forksCount.toString()
    )
    expect(getByTestId('fork-count').getAttribute('href')).toBe(
      repoMock.htmlUrl + '/network/members'
    )
  })

  test('Renders correct last push time', () => {
    expect(getByText('Updated on Nov 12, 2018')).not.toBeNull()
  })
})
