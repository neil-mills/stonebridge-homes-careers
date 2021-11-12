import React, { useEffect, useState, useRef } from 'react'
import styled from 'styled-components'

const SectionStyles = styled.section`
  display: block;
  position: relative;
  width: 100%;
  height: 320px;
  background-position: top center;
  background-size: cover;
  @media screen and (min-width: 768px) {
    height: 42vw;
    max-height: 600px;
    background-attachment: fixed;
  }
`

interface ParallaxImageProps {
  src: string
  srcLg: string
  breakpoint?: number
}
const ParallaxImage = ({
  src,
  srcLg,
  breakpoint = 767,
}: ParallaxImageProps): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [loaded, setLoaded] = useState<number>(0)
  const [bgSrc, setBgSrc] = useState<string>('')

  const preloadImages = () => {
    console.log('preload')
    const images: string[] = [src, srcLg]
    images.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setLoaded(prevState => (prevState += 1))
      }
    })
  }

  const handleResize = () => {
    setBgSrc(window.innerWidth <= breakpoint ? src : srcLg)
  }

  useEffect(() => {
    if (loaded === 0) {
      preloadImages()
    }
    if (loaded === 2 && sectionRef.current) {
      handleResize()
      window.addEventListener('resize', handleResize)
      sectionRef.current.style.opacity = '1'
    }
    if (bgSrc && sectionRef.current) {
      sectionRef.current.style.backgroundImage = `url(${bgSrc})`
    }
  }, [loaded, bgSrc])

  return <SectionStyles ref={sectionRef} />
}

export default ParallaxImage
