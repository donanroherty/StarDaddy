import React from 'react'
import styled from 'styled-components'
import RepoList from './RepoList'
import ResultsToolbar from './ResultsToolbar'

const ResultsPanel = () => {
  return (
    <Wrapper data-testid="results-panel">
      <ResultsToolbar />
      <RepoList />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 100%;
`

export default ResultsPanel
