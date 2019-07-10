import React from 'react'
import { render, cleanup, fireEvent } from 'utils/test-utils'
import Tag from '../Tag'

afterEach(() => cleanup())

const deleteMock = jest.fn()

test('Tag calls correct function in props when clicked', () => {
  expect(deleteMock).toHaveBeenCalledTimes(0)
  const { rerender, getByTestId } = render(
    <Tag tagName="my-tag" delete={deleteMock} />
  )
  fireEvent.click(getByTestId(/tag/))
  expect(deleteMock).toHaveBeenCalledTimes(1)

  expect(deleteMock).toHaveBeenCalledWith('my-tag')
})
