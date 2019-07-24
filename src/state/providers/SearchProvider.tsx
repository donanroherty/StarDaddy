import React, { useState } from 'react'
import { SearchResultType } from 'types/Types'

type SearchContextType = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchTags: string[]
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>
  searchResults: SearchResultType[]
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResultType[]>>
}
export const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
)

export default function SearchProvider(props: any) {
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
