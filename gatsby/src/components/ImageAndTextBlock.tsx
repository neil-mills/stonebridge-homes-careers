import React, { useState, useEffect, useRef, useContext } from 'react'
import styled from 'styled-components'
import PlayIcon from '../assets/svg/play.svg'
import { MarginBottomNone } from '../assets/styles/Utils'
import Button from './Button'
import { navigate } from 'gatsby'
import { HeadingLarge } from '../assets/styles/Typography'
import Section from './Section'
import { ImageAndTextBlockType } from '../types'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'
import { useIsInViewport } from '../hooks/useIsInViewport'
import AppContext from '../context/AppContext'
const SectionStyles = styled.section`
  display: grid;
  gap: 2rem;
  @media screen and (min-width: 768px) {
    gap: 0;
  }
  grid-template-rows: repeat(auto, 2);
  align-items: center;
  h3 {
    ${HeadingLarge}
    margin-bottom: 2rem;
  }
  p {
    @media screen and (min-width: 768px) {
      padding-right: 2rem;
    }
    &:last-child {
      ${MarginBottomNone}
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    aside {
      padding: 0 0 0 4vw;
    }
    &[data-text-align='left'] {
      aside {
        order: 1;
        padding: 0 4vw 0 0;
      }
    }
  }
`
const Picture = styled.picture<{
  willAnimate: boolean
  isLoaded: boolean
}>`
  display: grid;
  transition: opacity 500ms ease, transform 1s ease;
  opacity: ${({ willAnimate }) => (willAnimate ? 0 : 1)};
  transform: ${({ willAnimate }) =>
    willAnimate ? 'translateY(50px)' : 'translateY(0)'};
  align-items: center;
  width: 100%;
  background: var(--light-grey);
  &[data-loaded='true'] {
    opacity: 1;
    transform: translateY(0);
  }
  img {
    grid-area: 1 / 1 / 1 / 1;
    object-fit: cover;
    width: 100%;
    visibility: ${({ isLoaded }) => (isLoaded ? 'visible' : 'hidden')};
  }
  svg {
    grid-area: 1 / 1 / 1 / 1;
    z-index: 1;
    justify-self: center;
  }
  @media screen and (min-width: 768px) {
    [data-text-align='left'] & {
      order: 2;
    }
  }
`

const ImageAndTextBlock = ({
  heading,
  sectionText,
  alignText = 'left',
  src,
  srcAlt = '',
  buttonLabel = '',
  buttonLink = [],
  videoSrc = '',
  tint = false,
  marginTop = true,
  marginBottom = true,
  buttonCallback,
}: ImageAndTextBlockType): JSX.Element => {
  const [loadedSrc, setLoadedSrc] = useState('')
  const [loadedSrcSet, setLoadedSrcSet] = useState('')
  const [willAnimate, setWillAnimate] = useState(false)
  const [animate, setAnimate] = useState(false)
  const { setVideoSrc } = useContext(AppContext)
  const imageRef = useRef(null)
  const isInViewport = useIsInViewport(imageRef)
  const [isLoaded] = useLazyLoadImages({
    ref: imageRef,
    srcSet: src?.asset.fluid.srcSet,
    options: {
      threshold: 0,
      rootMargin: '0px',
    },
  })

  const handleCallback = (e: Event): void => {
    if (videoSrc && setVideoSrc) {
      setVideoSrc(videoSrc)
    }
    if (buttonCallback) {
      buttonCallback(e)
    }
    if (buttonLink) {
      console.log(buttonLink[0])
      navigate(buttonLink[0].slug.current)
    }
  }

  useEffect(() => {
    const inViewport = isInViewport()
    setWillAnimate(!inViewport)
  }, [])

  useEffect(() => {
    if (isLoaded && src) {
      if (src.asset.fluid.srcSet) {
        setLoadedSrcSet(src.asset.fluid.srcSet)
      }
      if (src.asset.fluid.src) {
        setLoadedSrc(src.asset.fluid.src)
      }
      setTimeout(() => {
        setAnimate(true)
      }, 200)
    }
  }, [isLoaded])

  return (
    <Section tint={tint} marginTop={marginTop} marginBottom={marginBottom}>
      <SectionStyles data-text-align={alignText}>
        {src && videoSrc && (
          <Picture
            willAnimate={willAnimate}
            isLoaded={isLoaded}
            ref={imageRef}
            data-loaded={animate}
          >
            <source media="(min-width: 500px)" srcSet={loadedSrcSet} />
            <img src={loadedSrc} alt={srcAlt} />
          </Picture>
        )}
        {src && !videoSrc && (
          <Picture
            willAnimate={willAnimate}
            isLoaded={isLoaded}
            ref={imageRef}
            data-loaded={animate}
          >
            <source
              media="(min-width: 500px)"
              srcSet={src.asset.fluid.srcSet}
            />
            <img src={src.asset.fluid.src} />
          </Picture>
        )}
        <aside>
          <h2>{heading}</h2>
          <p>{sectionText}</p>
          {buttonLabel && (
            <Button
              label={buttonLabel}
              link={buttonLink}
              icon={videoSrc ? <PlayIcon /> : null}
              callback={handleCallback}
            />
          )}
        </aside>
      </SectionStyles>
    </Section>
  )
}

export default ImageAndTextBlock
