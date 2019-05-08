import React from 'react'
import styled from 'styled-components'

interface AppBarProps {}

const AppBar = (props: AppBarProps) => {
  return (
    <Wrapper data-testid="app-bar">
      <div />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 66px;
  height: 100%;
  background-color: ${props => props.theme.dark};
`

export default AppBar
