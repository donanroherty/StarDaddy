import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo from './Repo'
import useSearch, { getCombinedSearch } from 'state/hooks/useSearch'
import useGithub from 'state/hooks/useGithub'
import { AuthState } from 'types/GithubTypes'
import useAppState from 'state/hooks/useAppState'
import { FixedSizeList as List, FixedSizeGrid } from 'react-window'
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

  const ListItems = ({
    index,
    style
  }: {
    index: number
    style: React.CSSProperties
  }) => <Repo repo={reposData[index]} style={style} />

  const col1 = reposData.filter((val, i) => i === 0 || i % 2 === 0)
  const col2 = reposData.filter((val, i) => i % 2 !== 0)
  const GridCells = ({
    columnIndex,
    rowIndex,
    style
  }: {
    columnIndex: number
    rowIndex: number
    style: React.CSSProperties
  }) => {
    const repo = columnIndex === 0 ? col1[rowIndex] : col2[rowIndex]
    return repo ? <Repo repo={repo} style={style} /> : null
  }

  const gridLayout = true

  return (
    <Wrapper data-testid="repo-list">
      <AutoSizer defaultHeight={1000} defaultWidth={450}>
        {autosizer =>
          gridLayout ? (
            <FixedSizeGrid
              columnCount={2}
              columnWidth={450}
              rowCount={reposData.length / 2}
              rowHeight={248}
              width={autosizer.width}
              height={autosizer.height}
              outerElementType={CustomScrollbarsVirtualList}
            >
              {GridCells}
            </FixedSizeGrid>
          ) : (
            <List
              height={autosizer.height}
              itemCount={reposData.length}
              itemSize={248}
              width={autosizer.width}
              outerElementType={CustomScrollbarsVirtualList}
            >
              {ListItems}
            </List>
          )
        }
      </AutoSizer>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
export default RepoList
