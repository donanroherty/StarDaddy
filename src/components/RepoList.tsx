import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import shortid from 'shortid'
import Repo from './Repo'
import { useStarred } from '../state/starred-context'

const RepoList = () => {
  const { starred } = useStarred()

  const repos = starred
    ? starred
        .map(star => (
          <div key={shortid.generate()}>
            <Repo {...star} />
          </div>
        ))
        // TODO: Remove in production. For testing only
        .filter((val, i) => i < 5)
    : null

  return <Wrapper>{repos}</Wrapper>
}

const Wrapper = styled.div`
  padding: 48px;
`

export default RepoList
