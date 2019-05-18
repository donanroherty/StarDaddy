import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'

interface ButtonProps {
  label?: string
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
}

const defaultProps: ButtonProps = {
  label: 'button',
  disabled: false,
  onClick: () => {}
}

const Button = (props: ButtonProps) => {
  const { label, disabled, onClick } = props

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick && !disabled) {
      onClick(e)
    }
  }

  return (
    <Wrapper disabled={disabled} data-testid="button" onClick={handleClick}>
      {label}
    </Wrapper>
  )
}

const Wrapper = styled.button`
  background-color: ${({ theme }) => theme.color.primary};
  padding: 10px 20px;
  border: none;
  text-decoration: none;
  color: white;
  font-size: 14px;
  font-weight: bold;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.color.primary)};
  }
  &:active {
    background-color: ${({ theme }) => darken(0.2, theme.color.primary)};
  }
  &:disabled {
    background-color: grey;
  }
`

Button.defaultPorps = defaultProps
export default Button
