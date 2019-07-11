import React, { useState } from 'react'
import styled, { withTheme } from 'styled-components'
import { lighten } from 'polished'
import { ThemeInterface } from 'theme/theme'
import { useDrag } from 'react-dnd'
import { DnDItemTypes } from '../types/DnDItemTypes'
import Icon from './Icon'

interface TagProps {
  name: string
  isEditing?: boolean
  isThin?: boolean
  hasDeleteIcon?: boolean
  cancelTagOperation?: () => void
  onClick?: (e: React.MouseEvent) => void
  submitName?: (name: string, prevName: string) => void
  theme: ThemeInterface
}

const Tag: React.FC<TagProps> = props => {
  const {
    name,
    isEditing,
    hasDeleteIcon,
    submitName,
    cancelTagOperation,
    onClick
  } = props
  const [inputValue, setInputValue] = useState(name)

  const [, drag] = useDrag({
    item: { name: name, type: DnDItemTypes.TAG },
    end: (dropResult?: { name: string }) => {
      if (dropResult) {
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleSubmitTagName = (e: any) => {
    // TODO: Validate input for duplicate tag name, illegal characters, etc.
    e.preventDefault()
    if (!submitName) return
    submitName(inputValue, name)
  }

  const handleNameInput = (e: any) => {
    setInputValue(e.target.value)
  }

  const handleBlur = () => {
    setInputValue(name)
    cancelTagOperation && cancelTagOperation()
  }

  return (
    <Wrapper>
      <Inner ref={drag} data-testid="tag" {...props} onClick={onClick}>
        {isEditing ? (
          <form onSubmit={handleSubmitTagName}>
            <input
              data-testid="tag-name-input"
              type="text"
              placeholder="...tag name"
              value={inputValue}
              onChange={handleNameInput}
              onBlur={handleBlur}
              maxLength={20}
              width="20"
              autoFocus
              onFocus={e => e.target.select()}
              name="tag-name"
              id="tag-name"
            />
          </form>
        ) : (
          name
        )}
      </Inner>
      <DeleteWrapper>
        {hasDeleteIcon && (
          <StyledIcon
            fillColor={props.theme.color.warning}
            icon="delete"
            size={10}
          />
        )}
      </DeleteWrapper>
    </Wrapper>
  )
}

const StyledIcon = styled(Icon)`
  transform: translate(-6px, -4px);
  position: absolute;
  visibility: hidden;
`
const DeleteWrapper = styled.div`
  height: 100%;
`
const Wrapper = styled.span`
  display: flex;
  flex-direction: row;
  margin: 4px 10px 4px 0px;
  user-select: none;

  &:hover ${StyledIcon} {
    visibility: visible;
  }
`
const Inner = styled.span<TagProps>`
  box-sizing: border-box;
  padding: ${({ isThin }) => `${isThin ? 1.5 : 6}`}px
    ${({ isThin }) => `${isThin ? 6 : 12}`}px;
  border-radius: 10px;
  border: 1px solid
    ${({ theme, isEditing }) =>
      lighten(
        isEditing ? 0.2 : 0.4,
        isEditing ? theme.color.success : theme.color.primary
      )};
  background-color: ${({ theme, isEditing }) =>
    lighten(
      isEditing ? 0.45 : 0.55,
      isEditing ? theme.color.success : theme.color.primary
    )};
  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
  font-weight: 600;

  > form > input {
    background-color: transparent;
    border-style: none;
  }
`

export default withTheme(Tag)
