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
  const { getSearchResults } = useSearch()
  const { fetchStars, authState } = useGithub()

  useEffect(() => {
    if (authState === AuthState.loggedIn) fetchStars()
  }, [authState])

  if (!stars) return null

  const results = getSearchResults()

  // Single column
  const ListItems = ({
    index,
    style
  }: {
    index: number
    style: React.CSSProperties
  }) => <Repo repo={results[index]} style={style} />

  // 2 column grid
  const col1 = results.filter((val, i) => i === 0 || i % 2 === 0)
  const col2 = results.filter((val, i) => i % 2 !== 0)
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
      {results.length > 0 ? (
        <AutoSizer defaultHeight={1000} defaultWidth={450}>
          {autosizer =>
            gridLayout ? (
              <FixedSizeGrid
                columnCount={2}
                columnWidth={450}
                rowCount={results.length / 2}
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
                itemCount={results.length}
                itemSize={248}
                width={autosizer.width}
                outerElementType={CustomScrollbarsVirtualList}
              >
                {ListItems}
              </List>
            )
          }
        </AutoSizer>
      ) : (
        <NoResultsNotice>
          ...no results matching search criteria
        </NoResultsNotice>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`
const NoResultsNotice = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
  font-weight: bold;
  font-size: 20px;
`
export default RepoList
