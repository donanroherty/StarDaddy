import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import { useSearch } from 'state/search-context'
import { StarredRepo } from 'types/GithubTypes'
import { useGithub } from 'state/github-context'

type SearchResult = {
  id: number
  matches: SearchMatch[]
}
type SearchMatch = {
  term: string
  count: number
}

export const sanitizeString = (str: string) =>
  str.replace(/[^a-zA-Z0-9]/gi, ' ')
export const stringToArray = (str: string) => {
  return sanitizeString(str)
    .split(' ')
    .filter(val => val !== ' ' && val !== '')
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

const RepoList = () => {
  const { searchTerm, searchTags } = useSearch()
  const { fetchStars, stars } = useGithub()

  useEffect(() => {
    fetchStars()
  }, [])

  if (!stars) return null

  const searchResults = getSearchResults(stars, searchTerm)
  const repos = stars.map(star => {
    const visible =
      // show all results if no search term is provided
      stringToArray(searchTerm).length === 0 ||
      searchResults.find(
        res =>
          // result has matched search terms
          res.matches.length > 0 &&
          // match result with star id
          star.id === res.id
      ) !== undefined

    return <Repo {...star} isVisible={visible} key={star.id} />
  })

  return <Wrapper>{repos}</Wrapper>
}

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
`

export default RepoList
