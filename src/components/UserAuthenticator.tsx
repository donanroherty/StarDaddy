import React, { useEffect } from 'react'
import styled from 'styled-components'
import logo from '../assets/vectors/logo.svg'
import Button from './ui/Button'

interface UserAuthenticatorProps {
  authorize: () => {}
}

const UserAuthenticator = (props: UserAuthenticatorProps) => {
  const { authorize } = props

  // On mount
  useEffect(() => {
    // Login user saved in local storage
    const localUser = localStorage.getItem('user-data')
    if (localUser) {
      authorize()
    }
  }, [])

  return (
    <Wrapper data-testid="user-setup-modal">
      <div>
        <Header>
          <img src={logo} alt="app logo" />
          <h1>Laniakea</h1>
          <h4>All your stars in one place</h4>
        </Header>

        <Content>
          <p>
            Laniakea helps you categorize and filter your starred repositories.
            <br />
            Click below to get started.
          </p>

          <ButtonWrapper>
            <Button label="Login with GitHub" onClick={authorize} />
          </ButtonWrapper>
        </Content>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Header = styled.div`
  width: 610px;
  height: 120px;
  border-radius: 16px 16px 0 0;
  background-color: white;
  font-family: ${({ theme }) => theme.font.brand}, sans-serif;
  text-align: center;

  > img {
    display: block;
    margin: 0 auto 0 auto;
    padding-top: 8px;
    width: 50px;
  }
  > h1 {
    margin: 0;
    line-height: 30px;
    font-size: 30px;
    font-weight: normal;
  }
  > h4 {
    margin: 0;
    font-size: 14px;
    font-style: italic;
    font-weight: normal;
  }
`
const Content = styled.div`
  width: 610px;
  height: auto;
  padding: 30px 0 30px 0;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.color.dark};
  color: white;

  > p {
    margin-top: 0;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }
`
const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`

export default UserAuthenticator
