import { MutableRefObject } from 'react'

export function useScrollIntoView(
  ref: MutableRefObject<HTMLElement | null>
): () => void {
  const scrollElementIntoView = () => {
    if (ref?.current) {
      window.scrollTo({
        behavior: 'smooth',
        top:
          ref.current.getBoundingClientRect().top -
          document.body.getBoundingClientRect().top -
          100,
      })
      // ref.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }
  return scrollElementIntoView
}
