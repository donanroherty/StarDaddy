import React from 'react'
import SearchToolPanel from '../SearchToolPanel'
import { render, cleanup, fireEvent } from 'utils/test-utils'
import userEvent from '@testing-library/user-event'
import 'jest-dom/extend-expect'

describe('Adding tags', () => {
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
})
