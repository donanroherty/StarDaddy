import React, { useState, useEffect } from 'react'
import defaultTagData from 'mock-data/default-tags.json'

type TagContextType = {
  tags: string[]
  setTags: React.Dispatch<React.SetStateAction<string[]>>
  isAddingTag: boolean
  setIsAddingTag: React.Dispatch<React.SetStateAction<boolean>>
  editingTag: number
  setEditingTag: React.Dispatch<React.SetStateAction<number>>
}
const TagContext = React.createContext<TagContextType | undefined>(undefined)

const TagProvider = (props: any) => {
  const [tags, setTags] = useState()
  const [isAddingTag, setIsAddingTag] = useState()
  const [editingTag, setEditingTag] = useState(-1)

  const value = React.useMemo(
    () => ({
      tags,
      setTags,
      editingTag,
      setEditingTag,
      isAddingTag,
      setIsAddingTag
    }),
    [tags, editingTag, isAddingTag]
  )
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

  const {
    tags,
    setTags,
    editingTag,
    setEditingTag,
    isAddingTag,
    setIsAddingTag
  } = context

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

  /**
   * Add tags
   */
  const beginAddTag = () => {
    setIsAddingTag(true)
  }
  const submitAddTag = (name: string) => {
    const tagExists = tags.find(t => t === name) && name.length > 0
    if (!tagExists) {
      setTags(prev => [name, ...prev])
      setIsAddingTag(false)
      return { success: true, message: `Added tag '${name}'` }
    } else {
      return { success: false, message: `Tag '${name}' already exists` }
    }
  }
  const cancelAddTag = () => {
    setIsAddingTag(false)
  }
  /*************************************/

  /**
   * Edit tags
   */
  const beginEditTag = (name: string) =>
    setEditingTag(tags.findIndex(t => t === name))
  const cancelEditTag = () => setEditingTag(-1)
  const submitEditTag = (name: string, prevName: string) => {
    if (!tags.filter(t => t !== prevName).find(t => t === name)) {
      setTags(prev => prev.map(tag => (tag === prevName ? name : tag)))
      setEditingTag(-1)
      return { success: true, message: `Renamed tag '${name}'` }
    } else {
      return { success: false, message: `Tag '${name}' already exists` }
    }
  }
  /*************************************/

  /**
   * Delete tags
   */
  const deleteTag = (name: string) => {
    setTags(prev => prev.filter(t => t !== name))
  }
  /*************************************/

  const handleKeyPress = (e: KeyboardEvent) => {
    if ((e.key === 'Escape' && editingTag) || isAddingTag) {
      cancelAddTag()
      cancelEditTag()
    }
  }

  // Side effects
  useEffect(updateTags, [])
  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false)
    return () => {
      document.removeEventListener('keydown', handleKeyPress, false)
    }
  }, [])

  return {
    tags,

    beginAddTag,
    submitAddTag,
    cancelAddTag,
    isAddingTag,

    beginEditTag,
    cancelEditTag,
    editingTag,
    submitEditTag,

    deleteTag
  }
}

export { TagProvider, useTags }
