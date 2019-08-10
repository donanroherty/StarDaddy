import { useEffect } from 'react'

/**
 *
 * @param ref The element ref considered 'inside'
 * @param handler Function to call on outside click
 * @param excludedElements (optional) Additional element refs to consider as 'inside', even if they are outside the primary element
 */
export default function useOutsideClick(
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent) => void,
  excludedElements: React.RefObject<HTMLElement>[] = []
) {
  useEffect(() => {
    const target = ref.current

    const onMouseDown = (e: MouseEvent) => {
      if (target && e.target) {
        // excludedElements or children of excludedElements will not trigger an outside click
        const targetConsideredAsInside =
          excludedElements.filter(
            ref =>
              ref.current &&
              (ref.current === (e.target as HTMLElement) ||
                ref.current.contains(e.target as HTMLElement))
          ).length > 0

        if (
          target !== e.target &&
          !target.contains(e.target as HTMLElement) &&
          !targetConsideredAsInside
        ) {
          handler(e)
        }
      }
    }
    window.addEventListener('mousedown', onMouseDown)
    return () => {
      window.removeEventListener('mousedown', onMouseDown)
    }
  }, [])
}
