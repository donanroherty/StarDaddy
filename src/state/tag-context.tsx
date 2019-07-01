import React, { useState, useEffect } from 'react'
import defaultTagData from 'mock-data/default-tags.json'

type TagContextType = {
  tags: string[]
  setTags: (newTags: any) => void
}
const TagContext = React.createContext<TagContextType | undefined>(undefined)

const TagProvider = (props: any) => {
  const [tags, setTags] = useState()

  const value = React.useMemo(() => ({ tags, setTags }), [tags])
  return <TagContext.Provider value={value} {...props} />
}

// Merges contents of two string arrays, skipping any duplicates
export const mergeTagArrays = (
  arrayA: string[],
  arrayB: string[]
): string[] => {
  const diff = arrayB.filter(b => arrayA.find(a => a === b) === undefined)
  return [...arrayA, ...diff]
}

const useTags = () => {
  const context = React.useContext(TagContext)
  if (!context) throw new Error('useTags must be used within a TagProvider')

  const { tags, setTags } = context

  const updateTags = () => {
    const localTags = localStorage.getItem('tags')
    const defaultTags = defaultTagData as string[]
    // TODO: Add fetched tags

    if (localTags) {
      const local = JSON.parse(localTags)
      const merged = mergeTagArrays(local, defaultTags)
      localStorage.setItem('tags', JSON.stringify(merged))
      setTags(merged)
    } else {
      localStorage.setItem('tags', JSON.stringify(defaultTags))
      setTags(defaultTags)
    }
  }

  useEffect(updateTags, [])

  return { tags }
}

export { TagProvider, useTags }
