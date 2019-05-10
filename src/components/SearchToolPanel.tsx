import React from 'react'
import styled from 'styled-components'

const SearchToolPanel = () => {
  return <Wrapper data-testid="search-tool-panel">Search</Wrapper>
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  color: ${props => props.theme.color.light};
  background-color: ${props => props.theme.color.bgLight};
`

export default SearchToolPanel
