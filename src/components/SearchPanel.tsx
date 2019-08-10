import React from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagToolbar from './TagToolbar'
import useTags from 'state/hooks/useTags'
import Tag from './Tag'
import useAppState from 'state/hooks/useAppState'
import usePopup from 'state/hooks/usePopup'
import useKeyPress from 'hooks/useKeyPress'

const SearchPanel = () => {
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
    tagRef: React.RefObject<HTMLDivElement>
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
        <div>
          Rename <strong>{prevName}</strong> to <strong>{tagName}</strong>?
        </div>,
        false,
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
        <div>
          Delete <strong>{tag}</strong>?
        </div>,
        false,
        [target.offsetLeft, target.offsetTop],
        () => {
          deleteTag(tag)
        },
        () => {}
      )
    }
  }

  return (
    <Wrapper data-testid="search-panel">
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
  width: 289px;
  height: 100vh;
  background-color: ${props => props.theme.color.bgLight};
  border-style: solid;
  border-width: 0 0.5px 0 0;
  border-color: ${props => props.theme.color.borderLight};
  padding: 12.8px;
  box-sizing: border-box;
  color: ${props => props.theme.color.light};
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export default SearchPanel
