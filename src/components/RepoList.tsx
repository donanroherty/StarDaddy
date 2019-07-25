import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import useSearch, { getCombinedSearch } from 'state/hooks/useSearch'
import useGithub from 'state/hooks/useGithub'
import { AuthState } from 'types/GithubTypes'
import useAppState from 'state/hooks/useAppState'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

const RepoList = () => {
  const { stars } = useAppState()
  const { searchTerm, searchTags } = useSearch()
  const { fetchStars, authState } = useGithub()

  useEffect(() => {
    if (authState === AuthState.loggedIn) fetchStars()
  }, [authState])

  if (!stars) return null

  const results = getCombinedSearch(stars, searchTerm, searchTags)

  const reposData = stars.filter(
    star =>
      // show all results if no search term is provided
      results.find(
        (res: any) =>
          // match result with star id
          star.id === res.id
      ) !== undefined
  )

  const Repos = ({ index, style }: { index: number; style: any }) => (
    <Repo {...reposData[index]} isVisible style={style} />
  )

  return (
    <Wrapper>
      {p => (
        <List
          height={p.height}
          itemCount={reposData.length}
          itemSize={248}
          width={p.width}
        >
          {Repos}
        </List>
      )}
    </Wrapper>
  )
}

const Wrapper = styled(AutoSizer)`
  width: 100%;
`

export default RepoList
