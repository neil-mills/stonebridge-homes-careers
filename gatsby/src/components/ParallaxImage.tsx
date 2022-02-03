import React, { FC, useEffect, useState, useRef } from 'react'
import styled from 'styled-components'
import { ParallaxImageBlockType } from '../types'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'

const SectionStyles = styled.section`
  display: block;
  position: relative;
  width: 100%;
  height: 320px;
  background-position: top center;
  background-size: cover;
  @media screen and (min-width: 768px) {
    height: 50vw;
    max-height: 500px;
  }
  @media screen and (min-width: 768px) and (orientation: landscape) {
    background-attachment: fixed;
    background-size: cover, auto, cover;
    background-repeat: no-repeat;
  }
`

const ParallaxImage: FC<ParallaxImageBlockType> = ({
  src,
  srcLarge,
  title,
}): JSX.Element => {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [bgSrc, setBgSrc] = useState<string>('')
  const [isLoaded] = useLazyLoadImages({
    ref: sectionRef,
    src: src && srcLarge ? [src.asset.fluid.src, srcLarge.asset.fluid.src] : [],
    options: {
      threshold: 0,
      rootMargin: '200px',
    },
  })

  useEffect(() => {
    if (isLoaded && src && srcLarge) {
      handleResize()
    }
  }, [isLoaded])

  const handleResize = () => {
    if (src && srcLarge) {
      setBgSrc(
        window.innerWidth <= 767
          ? src.asset.fluid.src
          : srcLarge.asset.fluid.src
      )
    }
  }

  return (
    <SectionStyles
      ref={sectionRef}
      style={{ backgroundImage: `url(${bgSrc})` }}
      role="img"
      aria-label={title}
    />
  )
}

export default ParallaxImage
