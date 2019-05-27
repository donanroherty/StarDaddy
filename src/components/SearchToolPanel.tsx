import React from 'react'
import styled from 'styled-components'
import SearchBox from './SearchBox'
import TagList from './TagList'

const SearchToolPanel = () => {
  return (
    <Wrapper data-testid="search-tool-panel">
      <SearchBox />
      <TagList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  color: ${props => props.theme.color.light};
  background-color: ${props => props.theme.color.bgLight};
`

export default SearchToolPanel
