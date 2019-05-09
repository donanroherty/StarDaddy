import React from 'react'
import styled from 'styled-components'

const SettingsToolPanel = () => {
  return (
    <Wrapper data-testid="settings-tool-panel">
      <UserDetails>
        <AccountRealName>Forname Surname</AccountRealName>
        <AccountUsername>username</AccountUsername>
      </UserDetails>

      <SettingList>
        <li>
          <SettingItem>Logout</SettingItem>
        </li>
        <li>
          <SettingItem>Setting</SettingItem>
        </li>
        <li>
          <SettingItem>Setting</SettingItem>
        </li>
      </SettingList>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;

  color: ${props => props.theme.light};
  background-color: ${props => props.theme.dark};
`
const UserDetails = styled.div`
  padding: 0 20px 0 20px;
  height: 100px;
`
const AccountRealName = styled.div`
  padding-top: 20px;
  font-size: 26px;
  font-weight: bold;
`
const AccountUsername = styled.div`
  font-size: 20px;
`
const SettingList = styled.ul`
  padding: 0 20px 0 20px;
  float: left;
  width: 100%;
  list-style-type: none;
`
const SettingItem = styled.div`
  font-size: 14px;
  height: 40px;
`

export default SettingsToolPanel
