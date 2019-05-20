import React from 'react'
import Icon from '../Icon'
import { render, cleanup } from 'react-testing-library'

afterEach(() => cleanup())

test('<Icon />', () => {
  const { container } = render(<Icon icon="settings" />)
  expect(container.firstChild).toMatchSnapshot()
})
