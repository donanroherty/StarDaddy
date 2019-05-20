import React from 'react'
import ResultsPanel from '../ResultsPanel'
import { StarredProvider } from '../../state/starred-context'
import { render, cleanup } from '../utils/test-utils'

afterEach(() => cleanup())

test('<ResultsPanel /> renders', () => {
  const component = render(
    <StarredProvider>
      <ResultsPanel />
    </StarredProvider>
  )
  expect(component).toBeTruthy()
})
