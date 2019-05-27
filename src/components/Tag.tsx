import React from 'react'
import styled from 'styled-components'
import { TagType } from 'types/Types'
import { lighten } from 'polished'

interface TagProps {
  tag: TagType
}

const Tag = (props: TagProps) => {
  const { name } = props.tag

  return <Wrapper data-testid="tag">{name}</Wrapper>
}

const Wrapper = styled.div`
  display: inline-block;
  padding: 6px 12px;
  margin: 4px 5px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => lighten(0.4, theme.color.primary)};
  background-color: ${({ theme }) => lighten(0.55, theme.color.primary)};
  color: ${({ theme }) => theme.color.text};
  font-size: 12px;
  font-weight: 600;
`

export default Tag
