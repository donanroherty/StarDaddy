import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import { useSearch, getSearchResults } from 'state/search-context'
import { useGithub } from 'state/github-context'
import { stringToArray } from 'utils/string-helpers'

const RepoList = () => {
  const { searchTerm } = useSearch()
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
