import React from 'react'
import { SettingsContext } from 'state/providers/SettingsProvider'

export default function useSettings() {
  const context = React.useContext(SettingsContext)
  if (!context)
    throw new Error('useSettings must be used within a SettingsProvider')

  const {
    settingsMenuOpen,
    setSettingsMenuOpen,
    aboutModalIsVisible,
    setAboutModalIsVisible
  } = context

  const showSettingsMenu = () => {
    setSettingsMenuOpen(true)
  }

  const hideSettingsMenu = () => {
    setSettingsMenuOpen(false)
  }

  const toggleSettingsMenu = () => {
    setSettingsMenuOpen(prev => (prev ? false : true))
  }

  const openAboutModal = () => {
    setAboutModalIsVisible(true)
  }
  const dismissAboutModal = () => {
    setAboutModalIsVisible(false)
  }

  return {
    settingsMenuOpen,
    showSettingsMenu,
    hideSettingsMenu,
    toggleSettingsMenu,
    aboutModalIsVisible,
    openAboutModal,
    dismissAboutModal
  }
}
