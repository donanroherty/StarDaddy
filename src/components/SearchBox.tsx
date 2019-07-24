import React, { useEffect } from 'react'
import styled, { withTheme } from 'styled-components'
import useSearch, { getCombinedSearch } from 'state/hooks/useSearch'
import { GoSearch, GoX } from 'react-icons/go'
import { ThemeInterface } from 'theme/theme'
import { useDrop } from 'react-dnd'
import { DnDItemTypes } from '../types/DnDItemTypes'
import Tag from './Tag'
import useAppState from 'state/hooks/useAppState'

interface SearchBoxProps {
  theme: ThemeInterface
}

const SearchBox: React.FC<SearchBoxProps> = ({ theme }) => {
  const {
    searchTerm,
    setSearchTerm,
    searchTags,
    addSearchTag,
    removeSearchTag
  } = useSearch()

  const [, dropRef] = useDrop({
    accept: DnDItemTypes.TAG,
    drop: (item: { name: string; type: string }, monitor) => {
      addSearchTag(item.name)
      return { name: 'SearchBox' }
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
    removeSearchTag(tag)
  }

  return (
    <Wrapper ref={dropRef} data-testid="search-box">
      <InputField>
        <input
          type="text"
          placeholder="Search..."
          id="search"
          onChange={event => setSearchTerm(event.target.value)}
          value={searchTerm}
        />

        {searchTerm.length === 0 ? (
          <GoSearch size="24px" data-testid="empty-search-icon" />
        ) : (
          <GoX
            size="24px"
            color={theme.color.warning}
            data-testid="clear-search-icon"
            onClick={e => setSearchTerm('')}
          />
        )}
      </InputField>

      <HR />

      {searchTags.length === 0 && (
        <DragPrompt>Drag tags here to filter</DragPrompt>
      )}

      <TagList>
        {searchTags.map(tag => (
          <Tag
            name={tag}
            isThin
            hasDeleteIcon
            handleTagClick={handleTagClick}
            key={tag}
          />
        ))}
      </TagList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: 15px;
  padding: 6px;
  box-sizing: border-box;
  background-color: white;
  overflow: hidden;
`
const InputField = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 6px 6px 6px 10px;
  > input {
    font-size: 18px;
    border: none;
    color: ${({ theme }) => theme.color.text};
  }
`
const HR = styled.div`
  border-top: 1px solid ${({ theme }) => theme.color.borderLight};
  height: 1px;
  padding: 0;
  margin: 0;
`
const DragPrompt = styled.div`
  color: ${({ theme }) => theme.color.light};
  font-size: 12px;
  padding-left: 10px;
  padding-top: 5px;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default withTheme(SearchBox)
