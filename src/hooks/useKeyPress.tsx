import { useEffect } from 'react'

export default function useKeyPress(keyPressCB: (e: KeyboardEvent) => void) {
  useEffect(() => {
    document.addEventListener('keydown', keyPressCB, false)
    return () => {
      document.removeEventListener('keydown', keyPressCB, false)
    }
  })
}
