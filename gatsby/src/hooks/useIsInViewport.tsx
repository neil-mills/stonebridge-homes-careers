import { useState, useEffect, RefObject } from 'react'

export const useIsInViewport = (
  ref: RefObject<HTMLElement>
): (() => boolean) => {
  // const [isInViewport, setIsInViewport] = useState(false)

  const isInViewport = () => {
    if (ref?.current) {
      const rect: DOMRect = ref?.current?.getBoundingClientRect()
      const inViewport: boolean =
        rect.top <=
        (window.innerHeight || document.documentElement.clientHeight)

      return inViewport
    }
    return false
  }
  return isInViewport
}
