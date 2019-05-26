import React from 'react'
import { useTags } from '../state/tag-context'

const TagList = () => {
  const { tags } = useTags()
  if (!tags) return null

  return (
    <div>
      {tags.map(val => (
        <div key={val.name}>{val.name}</div>
      ))}
    </div>
  )
}

export default TagList
