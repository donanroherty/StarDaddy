import React from 'react'
import SearchToolPanel from '../SearchToolPanel'
import { render, cleanup, fireEvent, getByTestId } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

afterEach(() => cleanup())

test('Clicking add tag button adds a new tag in edit mode', () => {
  const { getByTestId, getAllByTestId, queryByTestId } = render(
    <SearchToolPanel />
  )
  expect(queryByTestId('tag-name-input')).toBeFalsy()
  const firstTag = getAllByTestId('tag')[0]
  fireEvent.click(getByTestId('add-tag-button'))
  expect(getAllByTestId('tag')[0]).not.toBe(firstTag)
  expect(queryByTestId('tag-name-input')).toBeTruthy()
})

test('Submitting a new tag adds it to the list', () => {
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <SearchToolPanel />
  )
  fireEvent.click(getByTestId('add-tag-button'))
  userEvent.type(getByTestId('tag-name-input'), 'New Tag Name')
  fireEvent.submit(getByTestId('tag-name-input'))
  expect(queryByTestId('tag-name-input')).toBeFalsy()
  expect(getAllByTestId('tag')[0]).toHaveTextContent('New Tag Name')
})

test('Defocusing a tag in add mode deletes it', () => {
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <SearchToolPanel />
  )
  fireEvent.click(getByTestId('add-tag-button'))
  userEvent.type(getByTestId('tag-name-input'), 'Cancelled Tag Name')
  fireEvent.blur(getByTestId('tag-name-input'))

  expect(queryByTestId('tag-name-input')).toBeFalsy()
  expect(getAllByTestId('tag')[0]).not.toHaveTextContent('Cancelled Tag Name')
})

test('Shift-clicking makes a tag editible', () => {
  const { queryByTestId, getByTestId, getAllByTestId } = render(
    <SearchToolPanel />
  )
  expect(queryByTestId('tag-name-input')).toBeFalsy()
  const firstTag = getAllByTestId('tag')[0]
  fireEvent(
    firstTag,
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      shiftKey: true
    })
  )
  expect(getByTestId('tag-name-input')).toBeTruthy()
})

test('Submitting a new tag name is reflected in the tag list', () => {
  const { getByTestId, queryByTestId, getAllByTestId } = render(
    <SearchToolPanel />
  )
  fireEvent.click(getAllByTestId('tag')[0], { shiftKey: true })
  fireEvent.change(getByTestId('tag-name-input'), {
    target: { value: 'Edited Tag Name' }
  })
  fireEvent.submit(getByTestId('tag-name-input'))
  expect(queryByTestId('tag-name-input')).toBeFalsy()
  expect(getAllByTestId('tag')[0]).toHaveTextContent('Edited Tag Name')
})

test('Ctrl-clicking a tag deletes it', () => {
  const { getAllByTestId } = render(<SearchToolPanel />)
  const tags = getAllByTestId('tag')
  fireEvent.click(getAllByTestId('tag')[0], { ctrlKey: true })
  expect(getAllByTestId('tag').length).toEqual(tags.length - 1)
  expect(getAllByTestId('tag')[0]).toEqual(tags[1])
})
