import React from 'react'
import { PopupContext } from 'state/providers/PopupProvider'

export default function usePopup() {
  const context = React.useContext(PopupContext)
  if (!context) throw new Error('usePopup must be used within a PopupContext')
  const {
    isVisible,
    setIsVisible,
    screenCenter,
    setScreenCenter,
    position,
    setPosition,
    content,
    setContent,
    confirmationAction,
    setConfirmationAction,
    cancellationAction,
    setCancellationAction
  } = context

  const showConfirmPopup = (
    dialogContent: React.ReactNode,
    screenCenter: boolean,
    position: [number, number],
    onConfirmation: () => void,
    onCancel: () => void
  ) => {
    setContent(dialogContent)
    setPosition(position)
    setScreenCenter(screenCenter)
    setConfirmationAction(() => onConfirmation)
    setCancellationAction(() => onCancel)
    setIsVisible(true)
  }

  const handleConfirm = () => {
    setIsVisible(false)
    confirmationAction()
    setConfirmationAction(() => () => {})
  }

  const handleCancel = () => {
    setIsVisible(false)
    cancellationAction()
    setCancellationAction(() => () => {})
  }

  return {
    isVisible,
    content,
    screenCenter,
    position,
    showConfirmPopup,
    handleCancel,
    handleConfirm
  }
}
