import { useState, useEffect, RefObject } from 'react'

export const useIsInViewport = (
  ref: RefObject<HTMLElement>
): (() => boolean) => {
  // const [isInViewport, setIsInViewport] = useState(false)

  const isInViewport = () => {
    if (ref?.current) {
      const rect: DOMRect = ref?.current?.getBoundingClientRect()
      const inViewport: boolean =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
          (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <=
          (window.innerWidth || document.documentElement.clientWidth)
      return inViewport
    }
    return false
  }
  return isInViewport
}
