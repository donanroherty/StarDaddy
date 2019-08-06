import React, { useCallback } from 'react'
import styled, { withTheme } from 'styled-components'
import Scrollbars from 'react-custom-scrollbars'
import { ThemeInterface } from 'theme/theme'
import { lighten } from 'polished'

interface CustomScrollbarsProps {
  onScroll?: () => void
  forwardedRef?: any
  style?: React.CSSProperties
  children?: React.ReactNode
  theme?: ThemeInterface
}

const CustomScrollbars: React.FC<CustomScrollbarsProps> = withTheme(
  ({ onScroll, forwardedRef, style, children }) => {
    const refSetter = useCallback(scrollbarsRef => {
      if (scrollbarsRef) {
        forwardedRef(scrollbarsRef.view)
      } else {
        forwardedRef(null)
      }
    }, [])

    const thumb = () => {
      const ThumbStyle = styled.div`
        background-color: ${({ theme }) => lighten(0.4, theme.color.primary)};
        border-radius: 5px;
      `
      return <ThumbStyle />
    }

    return (
      <Scrollbars
        ref={refSetter}
        style={{ ...style, overflow: 'hidden' }}
        onScroll={onScroll}
        renderThumbVertical={thumb}
      >
        {children}
      </Scrollbars>
    )
  }
)

export const CustomScrollbarsVirtualList = React.forwardRef((props, ref) => (
  <CustomScrollbars {...props} forwardedRef={ref} />
))
