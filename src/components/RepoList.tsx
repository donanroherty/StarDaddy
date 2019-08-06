import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import useSearch, { getCombinedSearch } from 'state/hooks/useSearch'
import useGithub from 'state/hooks/useGithub'
import { AuthState } from 'types/GithubTypes'
import useAppState from 'state/hooks/useAppState'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { CustomScrollbarsVirtualList } from './CustomScrollbar'

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
    star => results.find((res: any) => star.id === res.id) !== undefined
  )

  const Repos = ({
    index,
    style
  }: {
    index: number
    style: React.CSSProperties
  }) => <Repo repo={reposData[index]} style={style} />

  return (
    <Wrapper data-testid="repo-list">
      <AutoSizer defaultHeight={1000} defaultWidth={500}>
        {autosizer => (
          <List
            height={autosizer.height}
            itemCount={reposData.length}
            itemSize={248}
            width={autosizer.width}
            outerElementType={CustomScrollbarsVirtualList}
          >
            {Repos}
          </List>
        )}
      </AutoSizer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
export default RepoList
