import React from 'react'
import styled from 'styled-components'
import RepoList from './RepoList'

const ResultsPanel = () => {
  return (
    <Wrapper data-testid="results-panel">
      <RepoList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

export default ResultsPanel
