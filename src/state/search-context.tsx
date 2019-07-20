import React, { useState } from 'react'
import { StarredRepo } from 'types/GithubTypes'
import { stringToArray, sanitizeString } from 'utils/string-helpers'

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

type SearchResult = {
  id: number
  matches: SearchMatch[]
}
type SearchMatch = {
  term: string
  count: number
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

// Returns an array of repos that contain the given search terms separated by spaces
export const getSearchResults = (
  starredRepos: StarredRepo[],
  searchString: string
) => {
  const splitTerms = stringToArray(searchString)

  return (
    starredRepos
      .map(
        (star): SearchResult => {
          const repoName = sanitizeString(star.name) // Sanitize repo name
          const content = `${star.ownerLogin} ${repoName} ${star.description}` // Text to search

          const matches = splitTerms.reduce((prev: SearchMatch[], word) => {
            // Get number of occurences of a regex match for the given word
            const matchCount = (
              (content || '').match(new RegExp(word, 'gi')) || []
            ).length

            return matchCount === 0
              ? prev
              : [...prev, { term: word, count: matchCount }]
          }, [])

          return {
            id: star.id,
            matches: matches
          }
        }
      )
      // Filter out results which don't contain a match for each search term
      .filter(val => val.matches.length === splitTerms.length)
  )
}

export { SearchProvider, useSearch }
