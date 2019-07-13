import React from 'react'
import ResultsPanel from '../ResultsPanel'
import { StarProvider } from 'state/star-context'
import { render, cleanup } from 'utils/test-utils'

afterEach(() => cleanup())

test('<ResultsPanel /> renders', () => {
  const component = render(
    <StarProvider>
      <ResultsPanel />
    </StarProvider>
  )
  expect(component).toBeTruthy()
})
