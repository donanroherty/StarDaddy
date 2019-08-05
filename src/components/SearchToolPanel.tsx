import React, { useEffect, RefObject } from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagToolbar from './TagToolbar'
import useTags from 'state/hooks/useTags'
import Tag from './Tag'
import useAppState from 'state/hooks/useAppState'
import usePopup from 'state/hooks/usePopup'
import useKeyPress from 'hooks/useKeyPress'

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
  const { showConfirmPopup, handleCancel } = usePopup()

  const displayTags = isAddingTag ? ['new tag', ...tags] : tags

  useKeyPress((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      cancelTagOperation()
    }
  })

  const submitTagName = (
    tagName: string,
    prevName: string,
    tagRef: RefObject<HTMLDivElement>
  ) => {
    if (isAddingTag) submitAddTag(tagName)
    else if (editingTag > -1) {
      if (tagName === prevName) {
        cancelTagOperation()
        return
      }

      const pos: [number, number] = tagRef.current
        ? [tagRef.current.offsetLeft, tagRef.current.offsetTop]
        : [0, 0]

      showConfirmPopup(
        [280, 80],
        <div>
          Rename <strong>{prevName}</strong> to <strong>{tagName}</strong>?
        </div>,
        pos,
        () => {
          submitEditTag(tagName, prevName)
        },
        () => {
          cancelTagOperation()
        }
      )
    }
  }

  const handleTagClick = (tag: string, event: React.MouseEvent) => {
    handleCancel()

    event.shiftKey && beginEditTag(tag)

    if (event.ctrlKey) {
      const target = event.target as HTMLDivElement

      showConfirmPopup(
        [230, 80],
        <div>
          Delete <strong>{tag}</strong>?
        </div>,
        [target.offsetLeft, target.offsetTop],
        () => {
          deleteTag(tag)
        },
        () => {}
      )
    }
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
              isSearchPanelTag
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
