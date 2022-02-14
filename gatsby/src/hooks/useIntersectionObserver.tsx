import { useState, useEffect, RefObject } from 'react'

type IntersectionObserverParams = {
  ref?: RefObject<HTMLElement>
  options?: {
    rootMargin?: string
    threshold?: number
  }
}
export function useIntersectionObserver({
  ref,
  options = {},
}: IntersectionObserverParams): boolean {
  const [isInViewport, setIsInViewport] = useState<boolean>(false)
  const observerOptions = {
    root: null, // relative to document viewport
    ...options,
  }
  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setIsInViewport(true)
        if (ref?.current) {
          observer.unobserve(ref.current)
        }
      }
    })
  }
  useEffect(() => {
    if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
      const observer: IntersectionObserver = new IntersectionObserver(
        callback,
        observerOptions
      )
      if (ref?.current) {
        observer.observe(ref.current)
      }
      return () => {
        if (ref?.current) {
          observer.unobserve(ref.current)
        }
      }
    } else {
      setIsInViewport(true)
    }
  }, [])
  return isInViewport
}
