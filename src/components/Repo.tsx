import React from 'react'
import styled from 'styled-components'
import { GoStar, GoRepoForked } from 'react-icons/go'
import { StarredRepo } from 'types/GithubTypes'
import Tag from './Tag'
import { DnDItemTypes } from 'types/DnDItemTypes'
import { useDrop } from 'react-dnd'
import { useGithub } from 'state/github-context'

export interface RepoProps extends StarredRepo {
  isVisible: boolean
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
    id,
    ownerLogin,
    name,
    htmlUrl,
    description,
    stargazersCount,
    forksCount,
    pushedAt,
    isVisible,
    tags
  } = props

  const { addTagToRepo, removeTagFromRepo } = useGithub()

  const [, dropRef] = useDrop({
    accept: DnDItemTypes.TAG,
    drop: (item: { name: string; type: string }, monitor) => {
      addTagToRepo(item.name, id)
      return { name: 'Repo' }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  })

  const handleTagClick = (
    tag: string,
    modifiers: { ctrlKey: boolean; shiftKey: boolean }
  ) => {
    removeTagFromRepo(tag, id)
  }

  return (
    <Wrapper
      data-testid="repo"
      ref={dropRef}
      style={{ display: isVisible ? 'initial' : 'none' }}
    >
      <TitleRow>
        <a
          href={htmlUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="title"
          title={`${ownerLogin} / ${name}`}
        >
          {ownerLogin} / <strong>{name}</strong>
        </a>
      </TitleRow>

      <Description>{description}</Description>

      <TagList>
        {tags &&
          tags.map(tag => (
            <Tag
              name={tag}
              key={tag}
              handleTagClick={handleTagClick}
              isThin
              hasDeleteIcon
            />
          ))}
      </TagList>

      <DetailsRow>
        {/* Stars */}
        <DetailLink
          href={`${htmlUrl}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="star-count"
        >
          <GoStar size="14px" />
          <span>{stargazersCount}</span>
        </DetailLink>

        {/* Forks */}
        <DetailLink
          href={`${htmlUrl}/network/members`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="fork-count"
        >
          <GoRepoForked size="14px" />
          <span>{forksCount}</span>
        </DetailLink>

        {/* Updated */}
        <LastUpdatedText>
          <span>{formatLastPushTime(pushedAt, new Date())}</span>
        </LastUpdatedText>
      </DetailsRow>
      <HR />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  max-width: 688px;
  padding: 24px;
  color: ${({ theme }) => theme.color.text};
`
const HR = styled.hr`
  width: 100%;
  border-width: 0 0 1px 0;
  border-color: ${({ theme }) => theme.color.borderLight};
  border-style: solid;
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

    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;

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
  margin-top: 15px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 12px;
`
const DetailsRow = styled.div`
  display: block;
  margin-top: 12px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
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

export default React.memo(Repo)
