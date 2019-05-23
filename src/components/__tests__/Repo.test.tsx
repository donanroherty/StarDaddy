import React from 'react'
import Repo, { RepoProps, formatLastPushTime } from '../Repo'
import { render } from '../utils/test-utils'

const repoProps: RepoProps = {
  ownerLogin: 'owner',
  ownerAvatarUrl: 'www.avatarurl.mock',
  name: 'repo-name',
  htmlUrl: 'www.repoaddress.mock',
  description: 'repo description',
  stargazersCount: 50,
  forksCount: 10,
  pushedAt: '2018-11-12T23:45:05Z',
  style: {}
}

describe('<Repo/> Renders correct content', () => {
  const { getByTestId, getByAltText, getByText } = render(
    <Repo {...repoProps} />
  )

  test('Avatar has correct url', () => {
    expect(getByAltText('avatar').getAttribute('src')).toBe(
      repoProps.ownerAvatarUrl
    )
  })

  test('Title is rendered correctly and has correct link href', () => {
    expect(getByTestId('title').innerHTML).toBe(
      'owner / <strong>repo-name</strong>'
    )
    expect(getByTestId('title').getAttribute('href')).toBe(repoProps.htmlUrl)
  })

  test('Description renders correct text', () => {
    expect(getByText(repoProps.description)).not.toBeNull()
  })

  test('Star count is displayed and has correct link href', () => {
    expect(getByTestId('star-count').lastElementChild!.innerHTML).toBe(
      repoProps.stargazersCount.toString()
    )
    expect(getByTestId('star-count').getAttribute('href')).toBe(
      repoProps.htmlUrl + '/stargazers'
    )
  })

  test('Fork count is displayed and has correct link href', () => {
    expect(getByTestId('fork-count').lastElementChild!.innerHTML).toBe(
      repoProps.forksCount.toString()
    )
    expect(getByTestId('fork-count').getAttribute('href')).toBe(
      repoProps.htmlUrl + '/network/members'
    )
  })

  test('Renders correct last push time', () => {
    expect(getByText('Updated on Nov 12, 2018')).not.toBeNull()
  })
})

describe('formatLastPushTime() returns correct values', () => {
  const now = new Date('2019-05-19T21:46:04.897Z')
  let then = new Date(now)
  afterEach(() => {
    then = new Date(now)
  })

  test('months, previous year', () => {
    then.setMonth(now.getMonth() - 22)
    expect(formatLastPushTime(then.toISOString(), now)).toBe(
      'Updated on Jul 19, 2017'
    )
  })

  test('month, same year', () => {
    then.setMonth(now.getMonth() - 3)
    expect(formatLastPushTime(then.toISOString(), now)).toBe('Updated  Feb 19')
  })

  test('days', () => {
    then.setDate(now.getDate() - 20)
    expect(formatLastPushTime(then.toISOString(), now)).toBe(
      'Updated 20 days ago'
    )
  })

  test('hours', () => {
    then.setHours(now.getHours() - 5)
    expect(formatLastPushTime(then.toISOString(), now)).toBe(
      'Updated 5 hours ago'
    )
  })

  test('minutes', () => {
    then.setMinutes(now.getMinutes() - 13)
    expect(formatLastPushTime(then.toISOString(), now)).toBe(
      'Updated 13 minutes ago'
    )
  })

  test('seconds', () => {
    then.setSeconds(now.getSeconds() - 27)
    expect(formatLastPushTime(then.toISOString(), now)).toBe(
      'Updated a moment ago'
    )
  })
})
