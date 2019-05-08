import React from 'react'
import styled from 'styled-components'

const ToolPanel = () => {
  return (
    <Wrapper data-testid="tool-panel">
      <div />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 289px;
  height: 100%;
  background-color: ${props => props.theme.bgLight};
  border-style: solid;
  border-width: 0 0.5px 0 0;
  border-color: ${props => props.theme.borderLight};
`

export default ToolPanel
