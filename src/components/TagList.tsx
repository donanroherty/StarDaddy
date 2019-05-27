import React, { useEffect } from 'react'
import { useTags } from 'state/tag-context'
import Tag from './Tag'
import defaultTagData from 'mock-data/default-tags.json'

const TagList = () => {
  const { tags } = useTags()
  if (!tags) return null

  const tagComps = tags.map(tag => <Tag tag={tag} key={tag.name} />)

  return <div>{tagComps}</div>
}

export default TagList
