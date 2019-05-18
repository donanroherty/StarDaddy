import React from 'react'
import AppBarButton from '../AppBarButton'
import { render, cleanup, fireEvent } from '../utils/test-utils'

afterEach(() => cleanup())

const mockOnClick = jest.fn()

test('onClick is called', () => {
  const { container } = render(
    <AppBarButton title="Search" icon="search" onClick={mockOnClick} />
  )

  const elem = container.firstElementChild
  expect(elem).not.toBeNull()

  if (elem) {
    expect(mockOnClick).toHaveBeenCalledTimes(0)
    fireEvent.click(elem)
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  }
})
