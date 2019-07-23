import React, { useState, useEffect } from 'react'
import { StarredRepo } from 'types/GithubTypes'
import { stringToArray, sanitizeString } from 'utils/string-helpers'
import { useGithub } from './github-context'

type SearchContextType = {
  searchTerm: string
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
  searchTags: string[]
  setSearchTags: React.Dispatch<React.SetStateAction<string[]>>
  searchResults: SearchResultType[]
  setSearchResults: React.Dispatch<React.SetStateAction<SearchResultType[]>>
}
const SearchContext = React.createContext<SearchContextType | undefined>(
  undefined
)

const SearchProvider = (props: any) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchTags, setSearchTags] = useState<string[]>([])
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([])

  const value = React.useMemo(
    () => ({
      searchTerm,
      setSearchTerm,
      searchTags,
      setSearchTags,
      searchResults,
      setSearchResults
    }),
    [searchTerm, searchTags, searchResults]
  )
  return <SearchContext.Provider value={value} {...props} />
}

type SearchResultType = {
  id: string
  name: string
  termMatches: TermMatch[]
  tagMatches: string[]
  searchRanking: number
}
type TermSearchResult = {
  id: string
  termMatches: TermMatch[]
}
type TermMatch = {
  term: string
  count: number
}

const useSearch = () => {
  const context = React.useContext(SearchContext)
  if (!context)
    throw new Error('useSearch must be used within a SearchProvider')

  const {
    searchTerm,
    setSearchTerm,
    searchTags,
    setSearchTags,
    searchResults,
    setSearchResults
  } = context

  const { stars } = useGithub()

  const addSearchTag = (tag: string) => {
    if (!searchTags.find(val => val === tag))
      setSearchTags(prev => [...prev, tag])
  }

  const removeSearchTag = (tag: string) => {
    setSearchTags(prev => prev.filter(t => t !== tag))
  }

  useEffect(() => {
    setSearchResults(getCombinedSearch(stars, searchTerm, searchTags))
  }, [searchTerm, searchTags])

  return {
    searchTerm,
    setSearchTerm,
    searchTags,
    setSearchTags,
    addSearchTag,
    removeSearchTag,
    searchResults
  }
}

// Returns an array of repos that contain the given search terms separated by spaces
export const searchByTerm = (
  starredRepos: StarredRepo[],
  searchString: string
) => {
  const splitTerms = stringToArray(searchString)

  return (
    starredRepos
      .map(
        (star): TermSearchResult => {
          const repoName = sanitizeString(star.name) // Sanitize repo name
          const content = `${star.ownerLogin} ${repoName} ${star.description}` // Text to search

          const matches = splitTerms.reduce((acc: TermMatch[], word) => {
            // Get number of occurences of a regex match for the given word
            const matchCount = (
              (content || '').match(new RegExp(word, 'gi')) || []
            ).length

            return matchCount === 0
              ? acc
              : [...acc, { term: word, count: matchCount }]
          }, [])

          return {
            id: star.id,
            termMatches: matches
          }
        }
      )
      // Filter out results which don't contain a match for each search term
      .filter(val => val.termMatches.length === splitTerms.length)
  )
}

export const searchByTag = (
  starredRepos: StarredRepo[],
  searchTags: string[]
) => {
  const matches = starredRepos
    .map(repo => {
      const found = repo.tags.reduce((acc: any, tag: any) => {
        return searchTags.find(st => st === tag) ? [...acc, tag] : acc
      }, [])

      return { id: repo.id, tagMatches: found }
    })
    // Filter out repos with no matched tags
    .filter(m => m.tagMatches.length === searchTags.length)

  return matches
}

export const getCombinedSearch = (
  starredRepos: StarredRepo[],
  searchString: string,
  searchTags: string[]
): SearchResultType[] => {
  const termResults = searchByTerm(starredRepos, searchString)
  const tagResults = searchByTag(starredRepos, searchTags)

  const combined: SearchResultType[] = starredRepos.map(star => {
    const termRes = termResults.find(res => res.id === star.id)
    const termMatches = termRes ? termRes.termMatches : []

    const tagRes = tagResults.find(res => res.id === star.id)
    const tagMatches = tagRes ? tagRes.tagMatches : []

    return {
      id: star.id,
      name: star.name,
      termMatches: termMatches,
      tagMatches: tagMatches,
      searchRanking: termMatches.length + tagMatches.length
    }
  })

  const final = combined
    // Should contain every search term and tag
    .filter(
      res =>
        res.searchRanking ===
        stringToArray(searchString).length + searchTags.length
    )

  return final
}

export { SearchProvider, useSearch }
