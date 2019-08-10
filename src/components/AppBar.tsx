import React, { useRef } from 'react'
import styled, { withTheme } from 'styled-components'
import { GoGear } from 'react-icons/go'
import { ThemeInterface } from 'theme/theme'
import SettingsMenu from './SettingsMenu'
import useSettings from 'state/hooks/useSettings'

interface AppBarProps {
  theme: ThemeInterface
}

const AppBar: React.FC<AppBarProps> = ({ theme }) => {
  const { toggleSettingsMenu } = useSettings()
  const settingsBtnRef = useRef<HTMLDivElement>(null)

  return (
    <Wrapper data-testid="app-bar">
      <Buttons>
        <SettingsButton
          onClick={toggleSettingsMenu}
          ref={settingsBtnRef}
          data-testid="settings-btn"
        >
          <GoGear size={35} color={theme.color.light} />
        </SettingsButton>
      </Buttons>
      <SettingsMenu settingsBtnRef={settingsBtnRef} />
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
  display: flex;
  align-items: flex-end;
  box-sizing: border-box;
  padding-bottom: 15px;
`
const SettingsButton = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  * {
    margin: auto;
  }
`

export default withTheme(AppBar)
