import React from 'react'
import styled, { withTheme } from 'styled-components'
import { ThemeInterface } from 'theme/theme'
import { lighten } from 'polished'
import { useTags } from 'state/tag-context'

interface TagToolbarProps {
  theme: ThemeInterface
}

const TagToolbar: React.FC<TagToolbarProps> = () => {
  const { beginAddTag } = useTags()

  return (
    <Wrapper>
      <Button onClick={beginAddTag}>
        <div>+</div>
      </Button>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
`

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 27px;
  height: 27px;
  border-radius: 10px;
  border: 2px solid ${({ theme }) => lighten(0.52, theme.color.primary)};
  color: ${({ theme }) => theme.color.primary};
  font-size: 16px;
  font-weight: 600;
  user-select: none;
  align-items: center;
`

export default withTheme(TagToolbar)
