import {
  useState,
  useEffect,
  RefObject,
  ForwardedRef,
  MutableRefObject,
} from 'react'

export function useIntersectionObserver(
  ref?: RefObject<HTMLElement>
): [boolean] {
  const [isInViewport, setIsInViewport] = useState<boolean>(false)
  const options = {
    root: null, // relative to document viewport
    rootMargin: '0px', // margin around root. Values are similar to css property. Unitless values not allowed
    threshold: 1, // visible amount of item shown in relation to root
  }
  const callback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
  ): void => {
    console.log('callback')
    entries.forEach(entry => {
      setIsInViewport(entry.isIntersecting)
      if (entry.isIntersecting) {
        console.log('is in  viewport')
      } else {
        console.log('is not in viewport')
      }
    })
  }
  useEffect(() => {
    const observer: IntersectionObserver = new IntersectionObserver(
      callback,
      options
    )
    console.log(ref)
    if (ref?.current) {
      console.log('observer inti')
      observer.observe(ref.current)
    }
    return () => {
      if (ref?.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])
  return [isInViewport]
}
