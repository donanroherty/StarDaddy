import React from 'react'
import { render, cleanup } from 'utils/test-utils'
import TagList from '../TagList'
import 'jest-dom/extend-expect'

afterEach(() => cleanup())

const mockTags = ['C++', 'Clojure', 'Go']

test('TagList renders a Tag component for each tag in state', () => {
  const { getAllByTestId } = render(<TagList tags={mockTags} />)
  const tags = getAllByTestId(/tag/i)

  expect(tags.length).toBe(mockTags.length)
  expect(tags[0]).toHaveTextContent(mockTags[0])
  expect(tags[1]).toHaveTextContent(mockTags[1])
  expect(tags[2]).toHaveTextContent(mockTags[2])
})
