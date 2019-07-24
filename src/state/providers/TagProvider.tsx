import React, { useState } from 'react'

type TagContextType = {
  isAddingTag: boolean
  setIsAddingTag: React.Dispatch<React.SetStateAction<boolean>>
  editingTag: number
  setEditingTag: React.Dispatch<React.SetStateAction<number>>
}
export const TagContext = React.createContext<TagContextType | undefined>(
  undefined
)

export default function TagProvider(props: any) {
  const [isAddingTag, setIsAddingTag] = useState()
  const [editingTag, setEditingTag] = useState(-1)

  const value = React.useMemo(
    () => ({
      editingTag,
      setEditingTag,
      isAddingTag,
      setIsAddingTag
    }),
    [editingTag, isAddingTag]
  )
  return <TagContext.Provider value={value} {...props} />
}
