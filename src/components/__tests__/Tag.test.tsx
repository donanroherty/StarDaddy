import React from 'react'
import { render, cleanup, fireEvent } from 'utils/test-utils'
import Tag from '../Tag'

afterEach(() => cleanup())

const clickMock = jest.fn()

test('Tag calls correct function in props when clicked', () => {
  expect(clickMock).toHaveBeenCalledTimes(0)
  const { getByTestId } = render(<Tag name="my-tag" onClick={clickMock} />)
  fireEvent.click(getByTestId(/tag/))
  expect(clickMock).toHaveBeenCalledTimes(1)
})
