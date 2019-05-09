import React from 'react'
import styled from 'styled-components'
import SettingsToolPanel from './SettingsToolPanel'

const ToolPanel = () => {
  return (
    <Wrapper data-testid="tool-panel">
      <SettingsToolPanel />
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
