import React, { FC, useState, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import Button from './Button'
import { HeadingLarge } from '../assets/styles/Typography'
import { SectionInner } from './Section'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'
import { useIntersectionObserver } from '../hooks/useIntersectionObserver'
import { useIsInViewport } from '../hooks/useIsInViewport'
import {
  SectionGutter,
  GutterPaddingLeft,
  GutterPaddingRight,
} from '../assets/styles/Utils'

interface ImageBannerProps {
  heading: string
  text: string
  src: string
  srcMobile: string
  srcAlt?: string
  buttonLabel?: string
  buttonLink?: string
  alignText?: string
  top?: boolean
  tint?: boolean
}

interface Props {
  tint?: boolean
}

const ImageBannerStyles = styled.section<Props>`
  width: 100%;
  display: grid;
  position: relative;
  align-items: start;
  background-color: ${({ tint }) =>
    tint ? 'var(--light-grey)' : 'var(--white)'};
  height: auto;
  @media screen and (min-width: 768px) {
    ${GutterPaddingRight}
    ${GutterPaddingLeft}
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 23vw;
      max-height: 406px;
    }
    &[data-position='top'] {
      padding-bottom: 2vw;
      @media screen and (min-width: 1024px) {
        padding-bottom: 0;
      }
      &:before {
        height: 16vw;
        max-height: 208px;
      }
    }
  }
`

const ImageBannerInner = styled.div`
  display: grid;
`

const InsetBox = styled.div<{ willAnimate: boolean; isDesktop: boolean }>`
  display: block;
  background-color: var(--green);
  transition: opacity 500ms ease, transform 1s ease;
  opacity: ${({ willAnimate, isDesktop }) =>
    willAnimate && isDesktop ? 0 : 1};
  transform: ${({ willAnimate, isDesktop }) =>
    willAnimate && isDesktop ? 'translateY(100px)' : 'translateY(0)'};
  &[data-active='true'] {
    opacity: 1;
    transform: translateY(0);
    div {
      transform: translateX(0);
      opacity: 1;
    }
  }
  width: 100%;
  ${SectionGutter}
  justify-self: end;
  [data-text-align='left'] & {
    justify-self: start;
  }
  [data-text-align='right'] & {
    justify-self: end;
  }
  z-index: 1;
  div {
    transition: opacity 500ms ease, transform 1s ease;
    opacity: ${({ willAnimate, isDesktop }) =>
      willAnimate && !isDesktop ? 0 : 1};
    transform: ${({ willAnimate, isDesktop }) =>
      willAnimate && !isDesktop ? 'translateX(50px)' : 'translateX(0)'};
  }
  h3 {
    ${HeadingLarge}
    color: var(--gold);
    margin-top: 0;
  }
  p {
    color: var(--white);
    &:last-child {
      margin-bottom: 0;
    }
  }

  @media screen and (min-width: 768px) {
    width: 50%;
    max-width: 592px;
    padding: 5.7vw;
  }
  @media screen and (min-width: 1600px) {
    padding: 8rem;
  }
`
const BgImage = styled.picture<{
  isLoaded: boolean
  willAnimate: boolean
  top: boolean
}>`
  background-color: var(--light-grey);
  img {
    object-fit: cover;
    object-position: center top;
    ${({ top }) =>
      !top &&
      css`
        transition: opacity 200ms ease;
      `};
    width: 100%;
    height: 100%;
    opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  }
  position: relative;
  height: 320px;
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: calc(var(--gutter-h) * 1.5);
    left: 0;
    height: auto;
  }
  @media screen and (min-width: 1600px) {
    bottom: 11rem;
  }
`

const ImageBanner: FC<ImageBannerProps> = ({
  top = false,
  src,
  srcMobile,
  // srcSet,
  srcAlt = '',
  heading,
  text,
  buttonLink,
  buttonLabel,
  alignText = 'right',
  tint = false,
}): JSX.Element => {
  const imageRef = useRef(null)
  const insetBoxRef = useRef(null)
  const [loadedSrc, setLoadedSrc] = useState('')
  const [loadedSrcSet, setLoadedSrcSet] = useState('')
  const [willAnimate, setWillAnimate] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [animate, setAnimate] = useState(false)
  const isInViewport = useIsInViewport(imageRef)
  const srcSet = `${src} 1400w`
  const [isLoaded] = useLazyLoadImages({
    ref: imageRef,
    srcSet: srcSet,
    options: {
      threshold: 0,
      rootMargin: '0px',
    },
  })
  const isScrolledIntoViewport = useIntersectionObserver({
    ref: insetBoxRef,
    options: {
      threshold: 0,
      rootMargin: '0px',
    },
  })

  useEffect(() => {
    const inViewport = isInViewport()
    setWillAnimate(!inViewport)
    setIsDesktop(window.innerWidth >= 768)
  }, [])

  useEffect(() => {
    if (isLoaded && src) {
      if (srcSet) {
        setLoadedSrcSet(srcSet)
      }
      if (src) {
        setLoadedSrc(srcMobile)
      }
    }
  }, [isLoaded])

  useEffect(() => {
    if (isScrolledIntoViewport && !animate) {
      setTimeout(() => {
        setAnimate(true)
      }, 750)
    }
  }, [isScrolledIntoViewport])

  return (
    <ImageBannerStyles
      tint={tint}
      data-position={top ? 'top' : 'page'}
      data-text-align={alignText}
    >
      <BgImage ref={imageRef} isLoaded={isLoaded} willAnimate={willAnimate}>
        <source media="(min-width: 500px)" srcSet={loadedSrcSet} />
        <img src={loadedSrc} alt={srcAlt} />
      </BgImage>
      <SectionInner>
        <ImageBannerInner>
          <InsetBox
            ref={insetBoxRef}
            willAnimate={willAnimate}
            isDesktop={isDesktop}
            data-active={animate}
          >
            <div>
              <h3>{heading}</h3>
              <p>{text}</p>
              {buttonLabel && buttonLink && (
                <Button label={buttonLabel} link={buttonLink} />
              )}
            </div>
          </InsetBox>
        </ImageBannerInner>
      </SectionInner>
    </ImageBannerStyles>
  )
}

export default ImageBanner
