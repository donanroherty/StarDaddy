import React from 'react'
import { TagContext } from 'state/providers/TagProvider'
import useAppState from './useAppState'
import { AppStateContext } from 'state/providers/AppStateProvider'

export default function useTags() {
  const context = React.useContext(TagContext)
  if (!context) throw new Error('useTags must be used within a TagProvider')
  if (!React.useContext(AppStateContext))
    throw new Error('useSearch must be used within a AppStateContext')

  const { editingTag, setEditingTag, isAddingTag, setIsAddingTag } = context

  const { setStars, tags, setTags } = useAppState()

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

  const addTagToRepo = (tag: string, repoId: string) => {
    setStars(prev =>
      prev.map(star => ({
        ...star,
        tags:
          star.id === repoId && !star.tags.find(t => t === tag)
            ? [...star.tags, tag]
            : star.tags
      }))
    )
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

      setStars(prev =>
        prev.map(star => ({
          ...star,
          tags: star.tags.map(tag => (tag === prevName ? name : tag))
        }))
      )

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

  const removeTagFromRepo = (tag: string, repoId: string) => {
    setStars(prev =>
      prev.map(star =>
        star.id !== repoId
          ? star
          : {
              ...star,
              tags: star.tags.filter(t => t !== tag)
            }
      )
    )
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
    cancelTagOperation,
    addTagToRepo,
    removeTagFromRepo
  }
}
