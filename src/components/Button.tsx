import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken, lighten } from 'polished'

interface ButtonProps {
  children?: React.ReactNode
  label?: string
  color?: string
  isRound?: boolean
  isHollow?: boolean
  radius?: number
  disabled?: boolean
  onClick?: (event: React.MouseEvent<HTMLElement>) => void
  type?: 'button' | 'submit' | 'reset' | undefined
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  color,
  disabled,
  onClick,
  type,
  radius,
  isRound,
  isHollow
}) => {
  const theme = useContext(ThemeContext)

  const buttonColor = color ? color : theme.color.primary

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (onClick && !disabled) {
      onClick(e)
    }
  }

  return (
    <Wrapper
      type={type}
      disabled={disabled}
      data-testid="button"
      onClick={handleClick}
      isRound={isRound}
      isHollow={isHollow}
      radius={radius}
      color={buttonColor}
    >
      {label}
      {children && children}
    </Wrapper>
  )
}

const Wrapper = styled.button<any>`
  padding: 0;
  background-color: ${({ color, isHollow }) =>
    isHollow ? 'transparent' : color};

  ${({ isRound }) => !isRound && 'padding: 10px 20px'};

  border: ${({ color, isHollow }) =>
    isHollow ? `1px solid ${color}` : `none`};

  text-decoration: none;
  color: white;
  font-size: 14px;
  font-weight: bold;
  border-radius: ${({ isRound }) => (isRound ? '50%' : 0)};
  width: ${({ isRound, radius }) => (isRound ? radius * 2 : 'initial')}px;
  height: ${({ isRound, radius }) => (isRound ? radius * 2 : 'initial')}px;

  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${({ color, isHollow }) =>
      isHollow ? lighten(0.5, color) : darken(0.1, color)};
  }
  &:active {
    background-color: ${({ color }) => darken(0.2, color)};
  }
  &:disabled {
    background-color: grey;
  }
`

const IconWrapper = styled.div`
  /* background-color: red; */
  width: 30px;
  height: 30px;
  padding: 0;
  margin: 0;
`

// Button.defaultProps = defaultProps
export default Button
