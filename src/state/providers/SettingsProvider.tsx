import React, { useState } from 'react'

type SettingsContextType = {
  settingsMenuOpen: boolean
  setSettingsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const SettingsContext = React.createContext<
  SettingsContextType | undefined
>(undefined)

export default function SettingsProvider(props: any) {
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)

  const value = React.useMemo(
    () => ({
      settingsMenuOpen,
      setSettingsMenuOpen
    }),
    [settingsMenuOpen]
  )
  return <SettingsContext.Provider value={value} {...props} />
}
