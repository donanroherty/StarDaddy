import React from 'react'
import styled from 'styled-components'
import RepoList from './RepoList'
import { StarProvider } from 'state/star-context'

const ResultsPanel = () => {
  return (
    <Wrapper data-testid="results-panel">
      <StarProvider>
        <RepoList />
      </StarProvider>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: scroll;
  padding: 24px 48px;
`

export default ResultsPanel
