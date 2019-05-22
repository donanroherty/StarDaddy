import React from 'react'
import { cleanup, render, fireEvent } from 'react-testing-library'
import SearchBox from '../SearchBox'
import { SearchProvider } from '../../state/search-context'

afterEach(() => cleanup())

test('<SearchBox/> renders an input field', () => {
  const { getByPlaceholderText, debug } = render(
    <SearchProvider>
      <SearchBox />
    </SearchProvider>
  )
  expect(getByPlaceholderText('Search...')).toBeTruthy()
})
