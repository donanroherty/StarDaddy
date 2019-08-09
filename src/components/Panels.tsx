import React from 'react'
import styled from 'styled-components'
import AppBar from './AppBar'
import ResultsPanel from './ResultsPanel'
import SearchPanel from './SearchPanel'

export enum ToolbarPanelOptions {
  Search,
  Settings
}

const Panels = () => {
  return (
    <Wrapper data-testid="panels">
      <AppBar />
      <SearchPanel />
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
