import React, { useEffect } from 'react'
import styled from 'styled-components'
import shortid from 'shortid'
import Repo from './Repo'
import { useStars } from '../state/star-context'
import { useSearch } from '../state/search-context'

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
      if (term === '' || term === ' ') return false

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

  const repos = filtered.map(star => (
    <div key={shortid.generate()}>
      <Repo {...star} />
    </div>
  ))

  return <Wrapper>{repos}</Wrapper>
}

const Wrapper = styled.div`
  padding: 48px;
`

export default RepoList
