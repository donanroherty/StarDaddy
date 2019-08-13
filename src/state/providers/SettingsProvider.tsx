import React, { useState } from 'react'

type SettingsContextType = {
  settingsMenuOpen: boolean
  setSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
  aboutModalIsVisible: boolean
  setAboutModalIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}
export const SettingsContext = React.createContext<
  SettingsContextType | undefined
>(undefined)

export default function SettingsProvider(props: any) {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
  const [aboutModalIsVisible, setAboutModalIsVisible] = useState(false)

  const value = React.useMemo(
    () => ({
      settingsMenuOpen,
      setSettingsMenuOpen,
      aboutModalIsVisible,
      setAboutModalIsVisible
    }),
    [settingsMenuOpen, aboutModalIsVisible]
  )
  return <SettingsContext.Provider value={value} {...props} />
}
