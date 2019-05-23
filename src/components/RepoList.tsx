import React, { useEffect } from 'react'
import styled from 'styled-components'
import Repo, { REPO_HEIGHT } from './Repo'
import { useStars } from '../state/star-context'
import { useSearch } from '../state/search-context'

import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

const RepoList = () => {
  const { stars, updateStars } = useStars()
  const { searchTerm } = useSearch()

  useEffect(() => {
    updateStars()
  }, [])

  if (!stars) return null

  const splitSearchTerm = searchTerm
    .replace(/-|_|\./gi, ' ')
    .split(' ')
    .filter(val => val !== ' ')

  const filtered = stars.filter(star => {
    const repoName = star.name.replace(/-|_|\./gi, ' ') // get as plain text

    const matches = splitSearchTerm.filter(term => {
      if (term === ' ') return false

      const regex = new RegExp(term, 'gi')
      return (
        repoName.match(regex) !== null ||
        star.ownerLogin.match(regex) !== null ||
        star.description.match(regex) !== null
      )
    })
    // Match all search terms
    return matches.length === splitSearchTerm.length
  })

  type RowType = {
    index: number
    style: any
  }

  // const Row = (args: RowType) => <div style={args.style}>Row {args.index}</div>
  const Row = (args: RowType) => (
    <Repo {...filtered[args.index]} style={args.style} />
  )

  return (
    <Wrapper>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={filtered.length}
            itemSize={REPO_HEIGHT}
            width={width}
          >
            {Row}
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
