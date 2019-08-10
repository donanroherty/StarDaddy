import React from 'react'
import SearchPanel from '../SearchPanel'
import ConfirmationPopup from 'components/ConfirmationPopup'
import { render, cleanup, fireEvent } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'

/**
 * Note
 * Currently cant test editing/deletion propagation to repos due to
 * react-window implementation.
 */

afterEach(() => cleanup())

test('Clicking add tag button adds a new tag in edit mode', () => {
  const { getByTestId, getAllByTestId, queryByTestId } = render(<SearchPanel />)
  expect(queryByTestId('tag-name-input')).toBeFalsy()
  const firstTag = getAllByTestId('tag')[0]
  fireEvent.click(getByTestId('add-tag-button'))
  expect(getAllByTestId('tag')[0]).not.toBe(firstTag)
  expect(queryByTestId('tag-name-input')).toBeTruthy()
})

test('Submitting a new tag adds it to the list', () => {
  const { getByTestId, queryByTestId, getAllByTestId } = render(<SearchPanel />)
  fireEvent.click(getByTestId('add-tag-button'))
  userEvent.type(getByTestId('tag-name-input'), 'New Tag Name')
  fireEvent.submit(getByTestId('tag-name-input'))
  expect(queryByTestId('tag-name-input')).toBeFalsy()
  expect(getAllByTestId('tag')[0]).toHaveTextContent('New Tag Name')
})

test('Defocusing a tag in add mode deletes it', () => {
  const { getByTestId, queryByTestId, getAllByTestId } = render(<SearchPanel />)
  fireEvent.click(getByTestId('add-tag-button'))
  userEvent.type(getByTestId('tag-name-input'), 'Cancelled Tag Name')
  fireEvent.blur(getByTestId('tag-name-input'))

  expect(queryByTestId('tag-name-input')).toBeFalsy()
  expect(getAllByTestId('tag')[0]).not.toHaveTextContent('Cancelled Tag Name')
})

describe('Tag renaming process', () => {
  afterEach(() => cleanup())

  test('Shift-clicking makes a tag editible', () => {
    const { queryByTestId, getByTestId, getAllByTestId } = render(
      <SearchPanel />
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

  test('Tag renaming flow', () => {
    const { getByTestId, queryByTestId, getAllByTestId } = render(
      <>
        <SearchPanel />
        <ConfirmationPopup />
      </>
    )
    fireEvent.click(getAllByTestId('tag')[0], { shiftKey: true }) // Initiate rename
    expect(queryByTestId('tag-name-input')).toBeTruthy()
    fireEvent.change(getByTestId('tag-name-input'), {
      target: { value: 'Edited Tag Name' }
    })
    fireEvent.submit(getByTestId('tag-name-input'))
    expect(queryByTestId('popup')).toBeVisible()
    fireEvent.click(getAllByTestId('button')[1]) //Click confirm button
    expect(queryByTestId('popup')).not.toBeVisible()
    expect(queryByTestId('tag-name-input')).toBeFalsy()
    expect(getAllByTestId('tag')[0]).toHaveTextContent('Edited Tag Name')
  })

  test('Cancel tag renaming', () => {
    const { getByTestId, getAllByTestId } = render(
      <>
        <SearchPanel />
        <ConfirmationPopup />
      </>
    )
    const tag = getAllByTestId('tag')[0].textContent
    fireEvent.click(getAllByTestId('tag')[0], { shiftKey: true }) // Initiate rename
    fireEvent.change(getByTestId('tag-name-input'), {
      target: { value: 'Edited Tag Name2' }
    })
    fireEvent.submit(getByTestId('tag-name-input'))
    fireEvent.click(getAllByTestId('button')[0]) //Click cancel button
    expect(getAllByTestId('tag')[0].textContent).toEqual(tag)
  })
})

describe('Tag deletion process', () => {
  afterEach(() => cleanup())

  test('Tag deletion flow', () => {
    const { getAllByTestId, queryByTestId } = render(
      <>
        <SearchPanel />
        <ConfirmationPopup />
      </>
    )
    const tags = getAllByTestId('tag')
    fireEvent.click(getAllByTestId('tag')[0], { ctrlKey: true }) // Initiate delete
    expect(queryByTestId('popup')).toBeVisible()
    fireEvent.click(getAllByTestId('button')[1]) //Click confirm button
    expect(queryByTestId('popup')).not.toBeVisible()
    expect(getAllByTestId('tag').length).toEqual(tags.length - 1)
    expect(getAllByTestId('tag')[0]).toEqual(tags[1])
  })

  test('Cancel tag deletion', () => {
    const { getAllByTestId } = render(
      <>
        <SearchPanel />
        <ConfirmationPopup />
      </>
    )
    const tags = getAllByTestId('tag')
    fireEvent.click(getAllByTestId('tag')[0], { ctrlKey: true }) // Initiate delete
    fireEvent.click(getAllByTestId('button')[0]) //Click cancel button
    expect(getAllByTestId('tag')).toEqual(tags)
  })
})
