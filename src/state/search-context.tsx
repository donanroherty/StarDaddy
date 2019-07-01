import React, { useState } from 'react'

type SearchContextType = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchTags: string[]
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>
}
const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
)

const SearchProvider = (props: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTags, setSearchTags] = useState<string[]>([])

  const value = React.useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      searchTags,
      setSearchTags
    }),
    [searchTerm, searchTags]
  )
  return <SearchContext.Provider value={value} {...props} />
}

const useSearch = () => {
  const context = React.useContext(SearchContext)
  if (!context)
    throw new Error('useSearch must be used within a SearchProvider')

  const { searchTerm, setSearchTerm, searchTags, setSearchTags } = context

  const addSearchTag = (tag: string) => {
    if (!searchTags.find(val => val === tag))
      setSearchTags(prev => [...prev, tag])
  }

  const removeSearchTag = (tag: string) => {
    setSearchTags(prev => prev.filter(t => t !== tag))
  }

  return {
    searchTerm,
    setSearchTerm,
    searchTags,
    setSearchTags,
    addSearchTag,
    removeSearchTag
  }
}

export { SearchProvider, useSearch }
