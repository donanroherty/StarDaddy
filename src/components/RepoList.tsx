import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import { useSearch, getCombinedSearch } from 'state/search-context'
import { useGithub } from 'state/github-context'
import { stringToArray } from 'utils/string-helpers'
import { AuthState } from 'types/GithubTypes'

const RepoList = () => {
  const { searchTerm, searchTags } = useSearch()
  const { fetchStars, stars, authState } = useGithub()

  useEffect(() => {
    if (authState === AuthState.loggedIn) fetchStars()
  }, [authState])

  if (!stars) return null

  const results = getCombinedSearch(stars, searchTerm, searchTags)

  const repos = stars.map(star => {
    const visible =
      // show all results if no search term is provided
      stringToArray(searchTerm).length === 0 ||
      results.find(
        (res: any) =>
          // result has matched search terms
          res.termMatches.length > 0 &&
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
