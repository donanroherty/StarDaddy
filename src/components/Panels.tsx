import React, { useState } from 'react'
import styled from 'styled-components'
import AppBar from './AppBar'
import ResultsPanel from './ResultsPanel'
import ToolPanel from './ToolPanel'

export enum ToolbarPanelOptions {
  Search,
  Settings
}

const Panels = () => {
  const [activeToolbarPanel, setActiveToolbarPanel] = useState(
    ToolbarPanelOptions.Search
  )
  return (
    <Wrapper data-testid="panels">
      <AppBar
        setActiveToolbarPanel={setActiveToolbarPanel}
        activeToolbarPanel={activeToolbarPanel}
      />
      <ToolPanel activeToolbarPanel={activeToolbarPanel} />
      <ResultsPanel />
    </Wrapper>
  )
}
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: auto auto 1fr;
`

export default Panels
