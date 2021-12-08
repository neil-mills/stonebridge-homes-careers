import { RefObject, useEffect, useState } from 'react'
import { useIntersectionObserver } from '@asyarb/use-intersection-observer'

type LazyLoadType = {
  ref: RefObject<HTMLElement>
  srcSet?: string
  src?: string[]
}
export const useLazyLoadImages = ({
  ref,
  srcSet,
  src,
}: LazyLoadType): [boolean, boolean] => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)

  const isInViewport = useIntersectionObserver({
    ref,
    options: {
      threshold: 0,
      triggerOnce: true,
    },
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
    }
    if (src) {
      try {
        const preloads: Promise<unknown>[] = src?.map(s => preloadSrc(s))
        await Promise.all(preloads)
        setIsLoaded(true)
        setIsError(false)
      } catch {
        setIsLoaded(false)
        setIsError(true)
      }
    }
  }

  useEffect(() => {
    if (isInViewport && srcSet) {
      console.log('in viewport')
      preloadImages()
    }
  }, [isInViewport])

  return [isLoaded, isError]
}
