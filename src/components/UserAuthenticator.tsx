import React, { useState, FormEvent, useRef } from 'react'
import styled from 'styled-components'
import Button from './Button'
import useGithub from 'state/hooks/useGithub'
import useAppState from 'state/hooks/useAppState'
import ReactTooltip from 'react-tooltip'
import Modal from './Modal'

interface UserAuthenticatorProps {
  show: boolean
}

const UserAuthenticator: React.FC<UserAuthenticatorProps> = ({ show }) => {
  const { accessToken } = useAppState()
  const { authorize } = useGithub()
  const [input, setInput] = useState(accessToken)
  const [authFailureMessage, setAuthFailureMessage] = useState()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    authorize(input, authCB)
  }

  const tooltipRef = useRef<HTMLDivElement>(null)

  const authCB = (success: boolean, payload: any) => {
    if (!success) {
      if (payload.response && payload.response.status === 401) {
        setAuthFailureMessage(
          <div>
            <strong>Unauthorized</strong>
            <div>Invalid access token</div>
          </div>
        )
      } else if (payload.message === 'Network Error') {
        setAuthFailureMessage(
          <div>
            <strong>Network Error</strong>
            <div>Could not connect to GitHub API</div>
          </div>
        )
      } else {
        setAuthFailureMessage(
          <div>
            <strong>Error</strong>
            <div>Could not connect to GitHub API</div>
          </div>
        )
        console.error(payload)
      }

      ReactTooltip.show(tooltipRef.current as Element)
      setTimeout(() => {
        ReactTooltip.hide(tooltipRef.current as Element)
      }, 4000)
    }
  }

  return (
    <Modal show={show}>
      <div>
        <TextContent>
          <p>
            StarDaddy helps you categorize and filter your starred repositories.
          </p>

          <p>
            StarDaddy uses a GitHub <strong>Personal Access Token</strong> to
            make requests to the GitHub API.
            <br />
            <a
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
            >
              Create a new token
            </a>
            , no permissions necessary, and enter the token in the box below to
            get started.
          </p>
        </TextContent>

        <form onSubmit={handleSubmit}>
          <div data-tip={authFailureMessage} ref={tooltipRef} />
          <ReactTooltip
            place="top"
            type="error"
            effect="solid"
            delayHide={1000}
          >
            {authFailureMessage}
          </ReactTooltip>
          <AccessTokenInput
            type="text"
            name="access token"
            title="access token"
            placeholder="access token"
            value={input}
            onChange={e => setInput(e.target.value)}
          />

          <ButtonWrapper>
            <Button label="Authenticate" type="submit" />
          </ButtonWrapper>
        </form>
      </div>
    </Modal>
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
const Logo = styled.svg`
  display: block;
  margin: 0 auto 0 auto;
  padding-top: 8px;
  width: 50px;
`
const Content = styled.div`
  width: 610px;
  box-sizing: border-box;
  padding: 30px 40px 30px 40px;
  border-radius: 0 0 16px 16px;
  background-color: ${({ theme }) => theme.color.dark};
  color: white;
`
const TextContent = styled.div`
  margin-bottom: 24px;
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
const AccessTokenInput = styled.input`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 400px;
  height: 40px;
  border-radius: 9px;
  border: none;
  text-align: center;
  font-size: 16px;
`

export default UserAuthenticator
