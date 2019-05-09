import React from 'react'
import styled, { withTheme } from 'styled-components'
import Icon from './ui/Icon'
import theme, { ThemeInterface } from '../theme/theme'
import icons from '../theme/icons'

interface AppBarButtonProps {
  title: string
  icon: keyof typeof icons
  theme?: ThemeInterface
}

const AppBarButton = (props: AppBarButtonProps) => {
  const iconColor = theme.light
  const iconSize = 35

  return (
    <Wrapper {...props}>
      <Icon icon={props.icon} size={iconSize} fillColor={iconColor} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${({ theme }) => theme.dark};
  display: flex;
  align-items: center;
  justify-content: center;
`

export default withTheme(AppBarButton)
