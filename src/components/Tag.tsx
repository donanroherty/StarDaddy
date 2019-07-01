import React from 'react'
import styled, { withTheme } from 'styled-components'
import { lighten } from 'polished'
import { ThemeInterface } from 'theme/theme'
import { useDrag } from 'react-dnd'
import { DnDItemTypes } from '../types/DnDItemTypes'
import Icon from './Icon'

interface TagProps {
  tagName: string
  isThin?: boolean
  delete?: (tagName: string) => void
  theme: ThemeInterface
}

const Tag: React.FC<TagProps> = props => {
  const { tagName } = props

  const [{ isDragging }, drag] = useDrag({
    item: { name: tagName, type: DnDItemTypes.TAG },
    end: (dropResult?: { name: string }) => {
      if (dropResult) {
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  })

  const handleDelete = () => {
    if (props.delete) props.delete(tagName)
  }

  return (
    <Wrapper ref={drag} data-testid="tag" {...props} onClick={handleDelete}>
      {tagName}
      {props.delete && (
        <StyledIcon
          fillColor={props.theme.color.warning}
          icon="delete"
          size={10}
        />
      )}
    </Wrapper>
  )
}

const StyledIcon = styled(Icon)`
  margin-left: 5px;
  position: absolute;
  transform: translate(0px, -4px);
  visibility: hidden;
`

const Wrapper = styled.div<TagProps>`
  display: inline-block;
  padding: 6px 12px;
  padding: ${({ isThin }) => `${isThin ? 1.5 : 6}px 12px`};
  margin: 4px 10px 4px 0px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => lighten(0.4, theme.color.primary)};
  background-color: ${({ theme }) => lighten(0.55, theme.color.primary)};
  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
  font-weight: 600;
  user-select: none;
  align-items: center;
  &:hover ${StyledIcon} {
    visibility: visible;
  }
`

export default withTheme(Tag)
