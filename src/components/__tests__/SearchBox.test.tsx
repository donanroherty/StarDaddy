import React from 'react'
import { cleanup, render, fireEvent } from 'utils/test-utils'
import SearchBox from '../SearchBox'
import { SearchProvider } from 'state/search-context'

afterEach(() => cleanup())

test('SearchBox icon changes when text is entered', () => {
  const { queryByTestId, getByPlaceholderText } = render(<SearchBox  />)

  expect(queryByTestId('empty-search-icon')).not.toBeNull()
  expect(queryByTestId('clear-search-icon')).toBeNull()
  fireEvent.change(getByPlaceholderText('Search...'), {
    target: { value: 'abc' }
  })
  expect(queryByTestId('empty-search-icon')).toBeNull()
  expect(queryByTestId('clear-search-icon')).not.toBeNull()
})

test('Clicking search clear icon calls setSearchTerm with an empty string', () => {
  const mockSetSearchTerm = jest.fn()
  const { getByTestId } = render(
    <SearchProvider
      value={{ searchTerm: 'abc', setSearchTerm: mockSetSearchTerm }}
    >
      <SearchBox />
    </SearchProvider>
  )
  fireEvent.click(getByTestId('clear-search-icon'))
  expect(mockSetSearchTerm).toHaveBeenCalledTimes(1)
  expect(mockSetSearchTerm).toHaveBeenCalledWith('')
})
