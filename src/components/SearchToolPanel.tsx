import React from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagToolbar from './TagToolbar'
import { useTags } from 'state/tag-context'
import Tag from './Tag'

const SearchToolPanel = () => {
  const {
    tags,
    editingTag,
    submitEditTag,
    beginEditTag,
    isAddingTag,
    cancelAddTag,
    cancelEditTag,
    submitAddTag,
    deleteTag
  } = useTags()

  const displayTags = isAddingTag ? ['new tag', ...tags] : tags

  const submitTagName = (tagName: string, prevName: string) => {
    if (isAddingTag) submitAddTag(tagName)
    else if (editingTag > -1) {
      submitEditTag(tagName, prevName)
    }
  }

  const cancelTagOperation = () => {
    if (isAddingTag) cancelAddTag()
    else if (editingTag) cancelEditTag()
  }

  const handleTagClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    const el = e.target as HTMLDivElement
    el.textContent && e.shiftKey && beginEditTag(el.textContent)
    el.textContent && e.ctrlKey && deleteTag(el.textContent)
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
              onClick={handleTagClick}
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
