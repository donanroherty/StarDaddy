import React from 'react'

import { render, cleanup } from 'utils/test-utils'
import TagList from '../TagList'

afterEach(() => cleanup())

test('<TagList/> renders', () => {
  const comp = render(<TagList />)
  expect(comp).not.toBeNull()
})

// it renders a list of tags
