import React from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagToolbar from './TagToolbar'
import useTags from 'state/hooks/useTags'
import Tag from './Tag'
import useAppState from 'state/hooks/useAppState'
import usePopup from 'state/hooks/usePopup'
import useKeyPress from 'hooks/useKeyPress'
import Scrollbars from 'react-custom-scrollbars'
import { lighten } from 'polished'
import useSearch from 'state/hooks/useSearch'

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
  const {
    addSearchTag,
    removeSearchTag,
    getSearchResults,
    searchTags
  } = useSearch()

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

    if (!event.shiftKey && !event.ctrlKey) {
      if (!searchTags.find(t => t === tag)) addSearchTag(tag)
      else removeSearchTag(tag)
    }

    // ! Disabled temporarily pending strategy for editing GitHub language tags
    // event.shiftKey && beginEditTag(tag)

    // if (event.ctrlKey) {
    //   const target = event.target as HTMLDivElement

    //   showConfirmPopup(
    //     <div>
    //       Delete <strong>{tag}</strong>?
    //     </div>,
    //     false,
    //     [target.offsetLeft, target.offsetTop],
    //     () => {
    //       deleteTag(tag)
    //     },
    //     () => {}
    //   )
    // }
  }

  const thumb = () => {
    const ThumbStyle = styled.div`
      background-color: ${({ theme }) => lighten(0.4, theme.color.primary)};
      border-radius: 5px;
    `
    return <ThumbStyle />
  }

  const searchResults = getSearchResults()

  return (
    <Wrapper data-testid="search-panel">
      <SearchBox />

      <TagToolbar />

      <TagsPanel>
        <Scrollbars
          style={{ width: '100%', height: '100%' }}
          renderThumbVertical={thumb}
        >
          <TagList>
            {displayTags &&
              displayTags.map((tag, i) => {
                const disabled =
                  searchResults.filter(sr => sr.tags.find(t => t === tag))
                    .length > 0
                    ? false
                    : true

                const highlight = searchTags.find(t => t === tag) !== undefined

                return (
                  <Tag
                    name={tag}
                    key={tag}
                    isSearchPanelTag
                    isEditing={(isAddingTag && i === 0) || editingTag === i}
                    submitName={submitTagName}
                    cancelTagOperation={cancelTagOperation}
                    handleTagClick={handleTagClick}
                    disabled={disabled}
                    highlight={highlight}
                  />
                )
              })}
          </TagList>
        </Scrollbars>
      </TagsPanel>
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
const TagsPanel = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 30px;
`
const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`

export default SearchPanel
