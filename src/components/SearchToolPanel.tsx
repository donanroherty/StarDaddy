import React from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagToolbar from './TagToolbar'
import { useTags } from 'state/tag-context'
import Tag from './Tag'

const SearchToolPanel = () => {
  const {
    tags,
    isAddingTag,
    cancelAddTag,
    submitAddTag
  } = useTags()

  const displayTags = isAddingTag ? ['new tag', ...tags] : tags

  const submitTagName = (tagName: string, prevName: string) => {
    if (isAddingTag) submitAddTag(tagName)
  }
  const cancelTagOperation = () => {
    if (isAddingTag) cancelAddTag()
  }

  return (
    <Wrapper data-testid="search-tool-panel">
      <SearchBox />

      <TagToolbar />

      <Tags>
        {displayTags &&
          displayTags.map((tag, i) => (
            <Tag
              tagName={tag}
              key={tag}
              isEditing={(isAddingTag && i === 0)}
              submitName={submitTagName}
              cancelTagOperation={cancelTagOperation}
            />
          ))}
      </Tags>
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

const Tags = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default SearchToolPanel
