import React, { useState, useRef, RefObject } from 'react'
import styled, { withTheme } from 'styled-components'
import { lighten } from 'polished'
import theme, { ThemeInterface } from 'theme/theme'
import { useDrag } from 'react-dnd'
import { DnDItemTypes } from '../types/DnDItemTypes'
import Icon from './Icon'

interface TagProps {
  name: string
  isEditing?: boolean
  isThin?: boolean
  isSearchPanelTag?: boolean
  hasDeleteIcon?: boolean
  cancelTagOperation?: () => void
  handleTagClick?: (tag: string, event: React.MouseEvent) => void
  disabled?: boolean
  highlight?: boolean
  submitName?: (
    name: string,
    prevName: string,
    ref: RefObject<HTMLDivElement>
  ) => void
  theme: ThemeInterface
}

const Tag: React.FC<TagProps> = props => {
  const {
    name,
    isEditing,
    hasDeleteIcon,
    submitName,
    cancelTagOperation,
    handleTagClick,
    disabled,
    highlight
  } = props
  const [inputValue, setInputValue] = useState(name)

  const ref = useRef<HTMLDivElement>(null)

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
    if (disabled) return
    if (!submitName) return
    submitName(inputValue, name, ref)
  }

  const handleNameInput = (e: any) => {
    if (disabled) return
    setInputValue(e.target.value)
  }

  const handleBlur = () => {
    if (disabled) return
    setInputValue(name)
    cancelTagOperation && cancelTagOperation()
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (disabled) return
    handleTagClick && handleTagClick(name, e)
  }

  const color = disabled
    ? 'darkgray'
    : highlight
    ? 'yellow'
    : isEditing
    ? theme.color.success
    : theme.color.primary

  return (
    <Wrapper {...props} ref={ref}>
      <Inner
        ref={drag}
        data-testid="tag"
        {...props}
        onClick={handleClick}
        disabled={disabled}
        highlight={highlight}
        color={color}
      >
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
const Wrapper = styled.span<TagProps>`
  display: flex;
  flex-direction: row;
  height: ${({ isThin }) => `${isThin ? '22px' : 'auto'}`};
  margin: 4px 6px 4px 0px;
  user-select: none;

  &:hover ${StyledIcon} {
    visibility: visible;
  }
`
const Inner = styled.span<any>`
  box-sizing: border-box;
  padding: ${({ isThin }) => `${isThin ? 1.5 : 4}`}px
    ${({ isThin }) => `${isThin ? 6 : 12}`}px;
  border-radius: 10px;
  border-width: 1px;
  border-style: solid;

  border-color: ${({ theme, isEditing, disabled, highlight, color }) => {
    if (disabled) return 'darkgray'
    else if (highlight) return lighten(0, '#F1E05A')
    else return lighten(isEditing ? 0.2 : 0.4, color)
  }};

  background-color: ${({ theme, isEditing, disabled, highlight, color }) => {
    if (disabled) return 'lightgray'
    else if (highlight) return lighten(0.3, '#F1E05A')
    else return lighten(isEditing ? 0.45 : 0.55, color)
  }};

  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
  font-weight: 600;

  > form > input {
    background-color: transparent;
    border-style: none;
  }
`

export default withTheme(Tag)
