import React from 'react'
import icons, { getIconDimensions } from '../icons'

test('getIconDimensions', () => {
  expect(getIconDimensions('settings', 13)).toEqual({ width: 13, height: 13 })
})
