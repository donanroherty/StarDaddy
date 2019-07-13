import React from 'react'
import { cleanup, render, fireEvent } from 'utils/test-utils'
import SearchBox from '../SearchBox'
import { SearchProvider } from 'state/search-context'
import '@testing-library/jest-dom/extend-expect'

const mockTags = ['C++', 'Clojure', 'Go']
const mockSetSearchTerm = jest.fn()

afterEach(() => {
  cleanup()
  mockSetSearchTerm.mockClear()
})

const renderComp = () =>
  render(
    <SearchProvider
      value={{
        searchTerm: 'abc',
        setSearchTerm: mockSetSearchTerm,
        searchTags: mockTags,
        setSearchTags: jest.fn()
      }}
    >
      <SearchBox />
    </SearchProvider>
  )

test('SearchBox icon changes when text is entered', () => {
  const { queryByTestId, getByPlaceholderText } = render(<SearchBox />)
  expect(queryByTestId('empty-search-icon')).not.toBeNull()
  expect(queryByTestId('clear-search-icon')).toBeNull()
  fireEvent.change(getByPlaceholderText('Search...'), {
    target: { value: 'abc' }
  })
  expect(queryByTestId('empty-search-icon')).toBeNull()
  expect(queryByTestId('clear-search-icon')).not.toBeNull()
})

test('Clicking search clear icon calls setSearchTerm with an empty string', () => {
  const { getByTestId } = renderComp()
  fireEvent.click(getByTestId('clear-search-icon'))
  expect(mockSetSearchTerm).toHaveBeenCalledTimes(1)
  expect(mockSetSearchTerm).toHaveBeenCalledWith('')
})

test('Tags are created for each tag in state', () => {
  const { getAllByTestId } = renderComp()
  expect(getAllByTestId('tag').length).toBe(mockTags.length)
  expect(getAllByTestId('tag')[0]).toHaveTextContent(mockTags[0])
  expect(getAllByTestId('tag')[1]).toHaveTextContent(mockTags[1])
  expect(getAllByTestId('tag')[2]).toHaveTextContent(mockTags[2])
})
