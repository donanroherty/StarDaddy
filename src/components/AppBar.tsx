import React from 'react'
import styled from 'styled-components'
import AppBarButton from './AppBarButton'
import { ToolbarPanelOptions } from './App'

interface AppBarProps {
  activeToolbarPanel: ToolbarPanelOptions
  setActiveToolbarPanel: (panel: ToolbarPanelOptions) => void
}

const AppBar = (props: AppBarProps) => {
  return (
    <Wrapper data-testid="app-bar">
      <Buttons>
        <AppBarButton
          title="Search"
          icon="search"
          onClick={() => {
            props.setActiveToolbarPanel(ToolbarPanelOptions.Search)
          }}
        />

        <AppBarButton
          title="Settings"
          icon="settings"
          onClick={() => {
            props.setActiveToolbarPanel(ToolbarPanelOptions.Settings)
          }}
        />
      </Buttons>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.dark};
`
const Buttons = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto auto 1fr;
  * {
    margin-top: 15px;
  }
`

export default AppBar
