import { MutableRefObject } from 'react'

export function useScrollIntoView(
  ref: MutableRefObject<HTMLElement | null>
): () => void {
  const scrollElementIntoView = () => {
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  return scrollElementIntoView
}
