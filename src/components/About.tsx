import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import Modal from './Modal'

interface AboutProps {
  show: boolean
  dismiss: () => void
}
const About: React.FC<AboutProps> = ({ show, dismiss }) => {
  return (
    <Modal show={show}>
      <TextContent>
        <p>
          <strong>v0.01</strong>
        </p>
        <p>Thanks for trying StarDaddy!</p>
        <p>
          You can find source code for this project at
          <br />
          <a
            href="https://github.com/donanroherty/StarDaddy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>github.com/donanroherty/StarDaddy</strong>
          </a>
        </p>
        <p>
          Got feedback, a bug report or feature request? Shoot me an email at
          <br /> <strong>ronandohertydev@gmail.com</strong>
        </p>
      </TextContent>

      <ButtonWrapper>
        <Button label="Continue" type="button" onClick={dismiss} />
      </ButtonWrapper>
    </Modal>
  )
}

const TextContent = styled.div`
  margin-bottom: 24px;
  > p {
    margin-top: 0;
    text-align: center;
    font-size: 14px;
    line-height: 24px;
  }
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary};
  }
`
const ButtonWrapper = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: center;
`

export default About
