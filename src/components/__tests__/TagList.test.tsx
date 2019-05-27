import React from 'react'
import { render, cleanup } from 'utils/test-utils'
import TagList from '../TagList'
import { TagProvider } from 'state/tag-context'
import 'jest-dom/extend-expect'

afterEach(() => cleanup())

const mockTags = [
  {
    name: 'C++'
  },
  {
    name: 'Clojure'
  },
  {
    name: 'Go'
  }
]

test('TagList renders a Tag component for each tag in state', () => {
  const { getAllByTestId } = render(
    <TagProvider value={{ tags: mockTags, setTags: jest.fn() }}>
      <TagList />
    </TagProvider>
  )
  const tags = getAllByTestId(/tag/i)

  expect(tags.length).toBe(mockTags.length)
  expect(tags[0]).toHaveTextContent(mockTags[0].name)
  expect(tags[1]).toHaveTextContent(mockTags[1].name)
  expect(tags[2]).toHaveTextContent(mockTags[2].name)
})
