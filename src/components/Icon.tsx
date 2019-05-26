/**
 * Icon.tsx
 * Helper class for creating svg icons with props for colour and shadow
 * Icons are defined either by paths in iconPaths or by providing svg child elements
 */

import React from 'react'
import styled from 'theme/themed-styled-components'
import icons, { getIconDimensions } from 'theme/icons'
import shortId from 'shortid'

export interface IconProps {
  fillColor?: string
  size?: number
  icon: keyof typeof icons
}

const defaultProps = {
  fillColor: 'red',
  size: 50,
  icon: 'settings'
}

const Icon = (props: IconProps) => {
  // Get viewbox dimensions from icon definition
  const iconDef = icons[props.icon]
  const vb = iconDef.viewBox
  const vbWidth = vb.x2 - vb.x1
  const vbHeight = vb.y2 - vb.y1

  const dimensions = getIconDimensions(props.icon, props.size!)

  const paths = iconDef.paths.map((val: any, i: any) => (
    <SVGInner
      key={props.icon + 'icon path' + shortId()}
      fillColor={props.fillColor}
    >
      {val}
    </SVGInner>
  ))

  return (
    <SVGWrapper
      {...props}
      viewBox={`0 0 ${vbWidth} ${vbHeight}`}
      height={dimensions.height}
      width={dimensions.width}
    >
      {paths}
    </SVGWrapper>
  )
}

const SVGWrapper = styled.svg<IconProps>`
  pointer-events: none;
  fill: ${props => props.fillColor};
`
const SVGInner = styled.svg<any>`
  fill: ${props => props.fillColor};
`

Icon.defaultProps = defaultProps
export default Icon
