import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import useSearch, { getCombinedSearch } from 'state/hooks/useSearch'
import useGithub from 'state/hooks/useGithub'
import { AuthState } from 'types/GithubTypes'
import useAppState from 'state/hooks/useAppState'

const RepoList = () => {
  const { stars } = useAppState()
  const { searchTerm, searchTags } = useSearch()
  const { fetchStars, authState } = useGithub()

  useEffect(() => {
    if (authState === AuthState.loggedIn) fetchStars()
  }, [authState])

  if (!stars) return null

  const results = getCombinedSearch(stars, searchTerm, searchTags)

  const repos = stars.map(star => {
    const visible =
      // show all results if no search term is provided
      results.find(
        (res: any) =>
          // match result with star id
          star.id === res.id
      ) !== undefined

    return <Repo {...star} isVisible={visible} key={star.id} />
  })

  return <Wrapper data-testid="repo-list">{repos}</Wrapper>
}

const Wrapper = styled.div`
  width: 100%;
  height: 500px;
`

export default RepoList
