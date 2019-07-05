import React from 'react'
import Tag from './Tag'

interface TagListProps {
  tags: string[]
  thinTags?: boolean
  delete?: (tagName: string) => void
}

const TagList: React.FC<TagListProps> = props => {
  const { tags, thinTags } = props

  if (!tags) return null

  return (
    <div>
      {tags.map(tag => (
        <Tag tagName={tag} isThin={thinTags} delete={props.delete} key={tag} />
      ))}
    </div>
  )
}

export default TagList
