import React from 'react'
import styled from 'styled-components'
import SearchToolPanel from './SearchToolPanel'

const ToolPanel = () => {
  return (
    <Wrapper data-testid="tool-panel">
      <SearchToolPanel />
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
`

export default ToolPanel
