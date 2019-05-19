import React from 'react'
import styled from 'styled-components'
import { GoStar, GoRepoForked } from 'react-icons/go'

export interface RepoProps {
  ownerLogin: string
  ownerAvatarUrl: string
  name: string
  htmlUrl: string
  description: string
  stargazersCount: number
  forksCount: number
  pushedAt: string
}

export const formatLastPushTime = (pushedAt: string, now: Date) => {
  const last = new Date(pushedAt)
  const diff = now.getTime() - last.getTime()
  const seconds = Math.floor(diff / 1000)

  const oneMinute = 60
  const oneHour = oneMinute * 60
  const oneDay = oneHour * 24
  const oneMonth = oneDay * 30

  if (seconds > oneMonth) {
    const lastPushTime = new Date(pushedAt)
    const isSameYear = now.getUTCFullYear() !== lastPushTime.getUTCFullYear()
    const split = lastPushTime.toUTCString().split(' ')

    return `Updated ${isSameYear ? 'on' : ''} ${split[2]} ${split[1]}${
      isSameYear ? `, ${split[3]}` : ''
    }`
  } else if (seconds > oneDay) {
    const days = Math.round(seconds / oneDay)
    return `Updated ${days} ${days > 1 ? 'days' : 'day'} ago`
  } else if (seconds > oneHour) {
    const hours = Math.round(seconds / oneHour)
    return `Updated ${hours} ${hours > 1 ? 'hours' : 'hour'} ago`
  } else if (seconds > oneMinute) {
    const minutes = Math.round(seconds / oneMinute)
    return `Updated ${minutes} ${minutes > 1 ? 'minutes' : 'minute'} ago`
  } else {
    return 'Updated a moment ago'
  }
}

const Repo = (props: RepoProps) => {
  const {
    ownerLogin,
    ownerAvatarUrl,
    name,
    htmlUrl,
    description,
    stargazersCount,
    forksCount,
    pushedAt
  } = props

  const now = new Date()

  return (
    <Wrapper>
      <TitleRow>
        <img src={ownerAvatarUrl} alt="avatar" />
        <a
          href={htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="title"
        >
          {ownerLogin} / <strong>{name}</strong>
        </a>
      </TitleRow>
      <Description>{description}</Description>
      <DetailsRow>
        {/* Stars */}
        <DetailLink
          href={`${htmlUrl}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          title="star-count"
        >
          <GoStar size="14px" />
          <span>{stargazersCount}</span>
        </DetailLink>

        {/* Forks */}
        <DetailLink
          href={`${htmlUrl}/network/members`}
          target="_blank"
          rel="noopener noreferrer"
          title="fork-count"
        >
          <GoRepoForked size="14px" />
          <span>{forksCount}</span>
        </DetailLink>

        {/* Updated */}
        <LastUpdatedText>
          <span>{formatLastPushTime(pushedAt, now)}</span>
        </LastUpdatedText>
      </DetailsRow>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  max-width: 688px;
  border-width: 0 0 1px 0;
  border-color: ${({ theme }) => theme.color.borderLight};
  border-style: solid;
  padding: 24px 0;
  color: ${({ theme }) => theme.color.text};
`
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  > a {
    font-size: 20px;
    font-weight: normal;
    color: ${({ theme }) => theme.color.primary};
    padding: 0px;
    margin: 0px;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
    :visited {
      color: ${({ theme }) => theme.color.primary};
    }
  }
  > img {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-right: 12px;
  }
`
const Description = styled.div`
  font-size: 14px;
  padding: 15px 0;
`
const DetailsRow = styled.div`
  font-size: 12px;
`
const DetailLink = styled.a`
  display: inline-block;
  text-decoration: none;
  color: ${({ theme }) => theme.color.text};
  :not(:first-child) {
    margin-left: 30px;
  }
  :hover {
    color: ${({ theme }) => theme.color.primary};
  }
  /* Select child that has a preceding adjacent element */
  * + * {
    margin-left: 6px;
  }
`
const LastUpdatedText = styled.div`
  display: inline-block;
  margin-left: 30px;
`

export default Repo
