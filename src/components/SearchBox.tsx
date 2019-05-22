import React from 'react'
import { useSearch } from '../state/search-context'

const SearchBox = () => {
  const { searchTerm, setSearchTerm } = useSearch()

  return (
    <div data-testid="search-box">
      <input
        type="text"
        placeholder="Search..."
        id="search"
        onChange={event => setSearchTerm(event.target.value)}
        value={searchTerm}
      />
    </div>
  )
}

export default SearchBox
