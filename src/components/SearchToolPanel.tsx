import React from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagList from './TagList'
import { useTags } from 'state/tag-context'

const SearchToolPanel = () => {
  const { tags } = useTags()

  return (
    <Wrapper data-testid="search-tool-panel">
      <SearchBox />
      <TagList tags={tags} />
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

export default SearchToolPanel
