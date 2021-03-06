import { RefObject, useEffect, useState } from 'react'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'

type LazyLoadType = {
  ref: RefObject<HTMLElement>
  srcSet?: string
  src?: string[]
  options?: {
    threshold?: number
    rootMargin?: string
  }
}
export const useLazyLoadImages = ({
  ref,
  srcSet,
  src = [],
  options = {},
}: LazyLoadType): [boolean, boolean] => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const isInViewport = useIntersectionObserver({
    ref,
    options,
  })

  const preloadSrc = (src: string) => {
    return new Promise((resolve, reject) => {
      const attr = srcSet ? 'srcset' : 'src'
      const image = new Image()
      image[attr] = src
      image.onload = () => resolve(true)
      image.onerror = () => reject(false)
    })
  }

  const preloadImages = async () => {
    if (srcSet) {
      try {
        await preloadSrc(srcSet)
        setIsLoaded(true)
        setIsError(false)
      } catch {
        setIsLoaded(false)
        setIsError(true)
      }
    } else if (src.length) {
      try {
        const preloads: Promise<unknown>[] = src?.map(s => preloadSrc(s))
        await Promise.all(preloads)
        setIsLoaded(true)
        setIsError(false)
      } catch {
        setIsLoaded(false)
        setIsError(true)
      }
    } else {
      setIsLoaded(true)
    }
  }

  useEffect(() => {
    if (isInViewport && (srcSet || src)) {
      preloadImages()
    }
    return () => setIsLoaded(false)
  }, [isInViewport, srcSet])

  return [isLoaded, isError]
}
