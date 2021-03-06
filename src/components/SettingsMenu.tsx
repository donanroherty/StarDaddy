import React, { useRef } from 'react'
import styled from 'styled-components'
import useAppState from 'state/hooks/useAppState'
import useGithub from 'state/hooks/useGithub'
import useSettings from 'state/hooks/useSettings'
import useOutsideClick from 'hooks/useOutsideClick'
import usePopup from 'state/hooks/usePopup'

interface SettingsMenuProps {
  settingsBtnRef: React.RefObject<HTMLDivElement>
}

const SettingsMenu: React.FC<SettingsMenuProps> = ({ settingsBtnRef }) => {
  const { user } = useAppState()
  const { logout } = useGithub()
  const { settingsMenuOpen, hideSettingsMenu, openAboutModal } = useSettings()
  const { showConfirmPopup, handleCancel } = usePopup()

  const ref = useRef<HTMLDivElement>(null)

  useOutsideClick(ref, hideSettingsMenu, [settingsBtnRef]) // Hide on outside click

  return (
    <Wrapper ref={ref} isVisible={settingsMenuOpen} data-testid="settings-menu">
      <UserDetails>
        <AccountRealName>{user.name}</AccountRealName>
        <a
          href={`https://github.com/${user.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <AccountUsername>{user.login}</AccountUsername>
        </a>
      </UserDetails>
      <SettingList>
        <SettingItem
          onClick={() => {
            openAboutModal()
            hideSettingsMenu()
          }}
        >
          About
        </SettingItem>

        <SettingItem
          onClick={() => {
            showConfirmPopup(
              <div>Clear all locally saved data and settings?</div>,
              true,
              [0, 0],
              () => {
                logout(true)
                hideSettingsMenu()
              },
              () => {
                handleCancel()
              }
            )
          }}
        >
          Clear local storage
        </SettingItem>

        <SettingItem
          onClick={() => {
            logout()
            hideSettingsMenu()
          }}
        >
          Logout
        </SettingItem>
      </SettingList>

      <Arrow />
    </Wrapper>
  )
}

const Wrapper = styled.div<any>`
  z-index: 500;
  visibility: ${({ isVisible }) => (isVisible ? 'visible' : 'hidden')};
  width: 240px;
  background-color: white;
  position: absolute;
  bottom: 10px;
  left: 54px;

  border-radius: 8px;
  border-width: 2px;
  color: ${({ theme }) => theme.color.text};
  font-size: 14px;

  filter: drop-shadow(0px 3px 6px rgba(0, 0, 0, 0.26));
`

const UserDetails = styled.div`
  padding: 0 20px 0 20px;
  height: 100px;
  > a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary};
    &:hover {
      text-decoration: underline;
    }
  }
`
const AccountRealName = styled.div`
  padding-top: 20px;
  font-size: 26px;
  font-weight: bold;
`
const AccountUsername = styled.div`
  font-size: 20px;
`
const SettingList = styled.div`
  width: 100%;
  height: 100%;
`
const SettingItem = styled.div`
  padding: 0px 20px;
  box-sizing: border-box;
  font-size: 14px;
  height: 40px;
  width: 100%;
  display: flex;
  align-items: center;
  user-select: none;
  &:hover {
    background-color: ${({ theme }) => theme.color.light};
  }
`
const Arrow = styled.div`
  width: 0;
  height: 0;
  border-top: 10px solid transparent;
  border-bottom: 10px solid transparent;
  border-right: 10px solid white;
  position: relative;
  left: -10px;
  bottom: 20px;
`

export default SettingsMenu
