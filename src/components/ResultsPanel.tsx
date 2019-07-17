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
  overflow-y: scroll;
  padding: 24px 48px;
`

export default ResultsPanel
