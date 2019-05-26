import React from 'react'
import Button from '../Button'
import { render, cleanup, fireEvent } from 'utils/test-utils'

afterEach(() => cleanup())

const mockOnClick = jest.fn()

test('onClick is called', () => {
  const { getByText } = render(
    <Button label="button label" onClick={mockOnClick} />
  )

  expect(mockOnClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByText('button label'))
  expect(mockOnClick).toHaveBeenCalledTimes(1)
})
