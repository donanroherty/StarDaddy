import React, { useState } from 'react'

type SearchContextType = {
  searchTerm: string
  setSearchTerm: (val: string) => void
}
const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
)

const SearchProvider = (props: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const value = React.useMemo(() => ({ searchTerm, setSearchTerm }), [
    searchTerm
  ])
  return <SearchContext.Provider value={value} {...props} />
}

const useSearch = () => {
  const context = React.useContext(SearchContext)
  if (!context)
    throw new Error('useSearch must be used within a SearchProvider')

  const { searchTerm, setSearchTerm } = context

  return { searchTerm, setSearchTerm }
}

export { SearchProvider, useSearch }
