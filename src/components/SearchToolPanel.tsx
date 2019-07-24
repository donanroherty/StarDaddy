import React, { useEffect } from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagToolbar from './TagToolbar'
import useTags from 'state/hooks/useTags'
import Tag from './Tag'
import useAppState from 'state/hooks/useAppState'

const SearchToolPanel = () => {
  const {
    editingTag,
    submitEditTag,
    beginEditTag,
    isAddingTag,
    cancelTagOperation,
    submitAddTag,
    deleteTag
  } = useTags()

  const { tags } = useAppState()

  const displayTags = isAddingTag ? ['new tag', ...tags] : tags

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelTagOperation()
    }
  }

  // Side effects
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false)
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false)
    }
  }, [])

  const submitTagName = (tagName: string, prevName: string) => {
    if (isAddingTag) submitAddTag(tagName)
    else if (editingTag > -1) {
      submitEditTag(tagName, prevName)
    }
  }

  const handleTagClick = (
    tag: string,
    modifiers: { ctrlKey: boolean; shiftKey: boolean }
  ) => {
    modifiers.shiftKey && beginEditTag(tag)
    modifiers.ctrlKey && deleteTag(tag)
  }

  return (
    <Wrapper data-testid="search-tool-panel">
      <SearchBox />

      <TagToolbar />

      <TagList>
        {displayTags &&
          displayTags.map((tag, i) => (
            <Tag
              name={tag}
              key={tag}
              isEditing={(isAddingTag && i === 0) || editingTag === i}
              submitName={submitTagName}
              cancelTagOperation={cancelTagOperation}
              handleTagClick={handleTagClick}
            />
          ))}
      </TagList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  padding: 12.8px;
  box-sizing: border-box;
  color: ${props => props.theme.color.light};
  background-color: ${props => props.theme.color.bgLight};
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default SearchToolPanel
