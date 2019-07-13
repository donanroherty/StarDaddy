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
  const localTags = localStorage.getItem('tags')
  const [tags, setTags] = useState<string[]>(
    localTags ? JSON.parse(localTags) : (defaultTagData as string[])
  )
  useEffect(() => {
    localStorage.setItem('tags', JSON.stringify(tags))
  }, [tags])

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

  // Add tags
  /*************************************/
  const beginAddTag = () => {
    setIsAddingTag(true)
  }
  const submitAddTag = (name: string) => {
    const tagExists = tags.find(t => t === name) && name.length > 0
    if (!tagExists) {
      setTags(prev => [name, ...prev])
      setIsAddingTag(false)
      return {
        success: true,
        message: `Added tag '${name}'`
      }
    } else {
      return {
        success: false,
        message: `Tag '${name}' already exists`
      }
    }
  }
  const cancelAddTag = () => {
    setIsAddingTag(false)
  }

  // Edit tags
  /*************************************/
  const beginEditTag = (name: string) =>
    setEditingTag(tags.findIndex(t => t === name))
  const cancelEditTag = () => setEditingTag(-1)
  const submitEditTag = (name: string, prevName: string) => {
    if (!tags.filter(t => t !== prevName).find(t => t === name)) {
      setTags(prev => prev.map(tag => (tag === prevName ? name : tag)))
      setEditingTag(-1)
      return {
        success: true,
        message: `Renamed tag '${name}'`
      }
    } else {
      return {
        success: false,
        message: `Tag '${name}' already exists`
      }
    }
  }

  // Delete tags
  /*************************************/
  const deleteTag = (name: string) => {
    setTags(prev => prev.filter(t => t !== name))
  }

  const cancelTagOperation = () => {
    cancelAddTag()
    cancelEditTag()
  }

  return {
    tags,
    beginAddTag,
    submitAddTag,
    isAddingTag,
    beginEditTag,
    editingTag,
    submitEditTag,
    deleteTag,
    cancelTagOperation
  }
}

export { TagProvider, useTags }
