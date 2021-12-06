import { ForwardedRef, RefObject, useEffect, useState } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

export const useLazyLoadImages = (
  ref: RefObject<HTMLElement>,
  srcSet?: string
): [boolean] => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInViewport] = useIntersectionObserver(ref)

  const preloadImages = () => {
    if (srcSet) {
      const image = new Image()
      image.srcset = srcSet
      image.onload = () => setIsLoaded(true)
      image.onerror = () => setIsLoaded(false)
    } else {
      setIsLoaded(false)
    }
  }

  useEffect(() => {
    if (isInViewport && srcSet) {
      console.log('in viewport')
      preloadImages()
    }
  }, [isInViewport])

  return [isLoaded]
}
