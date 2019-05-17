import React from 'react'
import Button from '../Button'
import { render, cleanup, fireEvent } from '../../utils/test-utils'

afterEach(() => cleanup())

const mockOnClick = jest.fn()

test('<Button/> renders', () => {
  const comp = render(<Button label="button label" onClick={mockOnClick} />)
  expect(comp).toBeTruthy()

  expect(comp.findByText('button label')).toBeTruthy()
})

test('onClick is called', () => {
  const { getByTestId } = render(
    <Button label="button label" onClick={mockOnClick} />
  )

  expect(mockOnClick).toHaveBeenCalledTimes(0)
  fireEvent.click(getByTestId('button'))
  expect(mockOnClick).toHaveBeenCalledTimes(1)
})
