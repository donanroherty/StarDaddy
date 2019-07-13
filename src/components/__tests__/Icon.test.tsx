import React from 'react'
import Icon from '../Icon'
import { render, cleanup } from 'utils/test-utils'

afterEach(() => cleanup())

test('<Icon />', () => {
  const { container } = render(<Icon icon="settings" />)
  expect(container.firstChild).toMatchSnapshot()
})
