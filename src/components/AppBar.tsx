import React from 'react'
import styled from 'styled-components'
import AppBarButton from './AppBarButton'

interface AppBarProps {}

const AppBar = (props: AppBarProps) => {
  return (
    <Wrapper data-testid="app-bar">
      <AppBarButton title="Settings" icon="settings" />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50px;
  height: 100%;
  background-color: ${({ theme }) => theme.dark};
`

export default AppBar
