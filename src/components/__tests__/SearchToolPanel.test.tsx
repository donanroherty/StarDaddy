import React from 'react'
import SearchToolPanel from '../SearchToolPanel'
import { render, cleanup } from '../utils/test-utils'

afterEach(() => cleanup())

test('<SearchToolPanel /> renders', () => {
  const { getByTestId } = render(<SearchToolPanel />)

  expect(getByTestId('search-box')).not.toBeNull()
})
