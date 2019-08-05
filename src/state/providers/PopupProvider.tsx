import React, { useState } from 'react'

type PopupType = {
  isVisible: boolean
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
  screenCenter: boolean
  setScreenCenter: React.Dispatch<React.SetStateAction<boolean>>
  position: [number, number]
  setPosition: React.Dispatch<React.SetStateAction<[number, number]>>
  content: React.ReactNode
  setContent: React.Dispatch<React.SetStateAction<React.ReactNode>>
  confirmationAction: () => void
  setConfirmationAction: React.Dispatch<React.SetStateAction<() => void>>
  cancellationAction: () => void
  setCancellationAction: React.Dispatch<React.SetStateAction<() => void>>
}
export const PopupContext = React.createContext<PopupType | undefined>(
  undefined
)

export default function PopupProvider(props: any) {
  const [isVisible, setIsVisible] = useState(false)
  const [screenCenter, setScreenCenter] = useState(false)
  const [position, setPosition] = useState<[number, number]>([0, 0])
  const [content, setContent] = useState<React.ReactNode>(
    <p>Popup content not set</p>
  )
  const [confirmationAction, setConfirmationAction] = useState<() => void>(
    () => () => {}
  )
  const [cancellationAction, setCancellationAction] = useState<() => void>(
    () => () => {}
  )

  const value = React.useMemo(
    () => ({
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
    }),
    [
      isVisible,
      screenCenter,
      position,
      confirmationAction,
      cancellationAction,
      content
    ]
  )
  return <PopupContext.Provider value={value} {...props} />
}
