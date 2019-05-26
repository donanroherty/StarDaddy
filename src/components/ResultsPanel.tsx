import React from 'react'
import RepoList from './RepoList'
import { StarProvider } from 'state/star-context'

const ResultsPanel = () => {
  return (
    <div data-testid="results-panel">
      <StarProvider>
        <RepoList />
      </StarProvider>
    </div>
  )
}

export default ResultsPanel
