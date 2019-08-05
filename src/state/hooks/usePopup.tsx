import React from 'react'
import { PopupContext } from 'state/providers/PopupProvider'

export default function usePopup() {
  const context = React.useContext(PopupContext)
  if (!context) throw new Error('usePopup must be used within a PopupContext')
  const {
    isVisible,
    setIsVisible,
    size,
    setSize,
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
    size: [number, number],
    dialogContent: React.ReactNode,
    position: [number, number],
    onConfirmation: () => void,
    onCancel: () => void
  ) => {
    setContent(dialogContent)
    setPosition(position)
    setConfirmationAction(() => onConfirmation)
    setCancellationAction(() => onCancel)
    setSize(size)
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
    size,
    position,
    showConfirmPopup,
    handleCancel,
    handleConfirm
  }
}
