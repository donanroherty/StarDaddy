import React from 'react'
import styled from 'styled-components'
import { GoStar, GoRepoForked } from 'react-icons/go'
import { StarredRepo } from 'types/GithubTypes'
import Tag from './Tag'
import { DnDItemTypes } from 'types/DnDItemTypes'
import { useDrop } from 'react-dnd'
import useTags from 'state/hooks/useTags'
import usePopup from 'state/hooks/usePopup'
import { formatTime } from 'utils/string-helpers'
import Scrollbars from 'react-custom-scrollbars'
import { lighten } from 'polished'

export interface RepoProps {
  repo: StarredRepo
  style: React.CSSProperties
}

const Repo: React.FC<RepoProps> = ({ repo, style }) => {
  const {
    id,
    ownerLogin,
    name,
    htmlUrl,
    description,
    stargazersCount,
    forksCount,
    pushedAt,
    tags
  } = repo

  const { addTagToRepo, removeTagFromRepo } = useTags()
  const { showConfirmPopup, handleCancel } = usePopup()

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

  const handleTagClick = (tag: string, event: React.MouseEvent) => {
    const target = event.target as HTMLDivElement
    console.log(target)

    showConfirmPopup(
      <div>
        Remove <strong>{tag}</strong> from <strong>{name}</strong>?
      </div>,
      true,
      [target.offsetLeft, target.offsetTop],
      () => {
        removeTagFromRepo(tag, id)
      },
      () => {}
    )
  }

  const thumb = () => {
    const ThumbStyle = styled.div`
      background-color: ${({ theme }) => lighten(0.4, theme.color.primary)};
      border-radius: 5px;
    `
    return <ThumbStyle />
  }

  return (
    <Wrapper data-testid="repo" ref={dropRef} style={style}>
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
      <Scrollbars
        style={{ width: 400, height: 60 }}
        renderThumbVertical={thumb}
      >
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
      </Scrollbars>
      <DetailsRow>
        <DetailLink
          href={`${htmlUrl}/stargazers`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="star-count"
        >
          <GoStar size="14px" />
          <span>{stargazersCount}</span>
        </DetailLink>

        <DetailLink
          href={`${htmlUrl}/network/members`}
          target="_blank"
          rel="noopener noreferrer"
          data-testid="fork-count"
        >
          <GoRepoForked size="14px" />
          <span>{forksCount}</span>
        </DetailLink>

        <LastUpdatedText>
          <span>{formatTime(pushedAt, new Date())}</span>
        </LastUpdatedText>
      </DetailsRow>
      <HR />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  box-sizing: border-box;
  min-width: 450px;
  max-width: 450px;
  height: 248px;
  padding: 24px;
  color: ${({ theme }) => theme.color.text};
`
const HR = styled.hr`
  width: 100%;
  border-width: 0 0 1px 0;
  border-color: ${({ theme }) => theme.color.borderLight};
  border-style: solid;
  margin: 10px 0;
`

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  > a {
    font-size: 20px;
    line-height: 1.4;
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
  line-height: 1.4;
  height: 39px;
  margin-top: 15px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
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
