import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import { useSearch, getCombinedSearch } from 'state/search-context'
import { useGithub } from 'state/github-context'
import { stringToArray } from 'utils/string-helpers'
import { AuthState } from 'types/GithubTypes'

const RepoList = () => {
  const { searchTerm, searchTags, searchResults } = useSearch()
  const { fetchStars, stars, authState } = useGithub()

  useEffect(() => {
    if (authState === AuthState.loggedIn) fetchStars()
  }, [authState])

  if (!stars) return null

  const repos = stars.map(star => {
    const visible =
      // show all results if no search term is provided
      searchResults.find(
        (res: any) =>
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
