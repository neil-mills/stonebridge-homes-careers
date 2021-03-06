import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  MouseEvent,
} from 'react'
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
  grid-gap: 2rem;
  @media screen and (min-width: 768px) {
    grid-gap: 0;
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
  isDesktop: boolean
}>`
  display: grid;
  transition: opacity 500ms ease, transform 1s ease;
  opacity: ${({ isLoaded, isDesktop }) => (isLoaded && isDesktop ? 1 : 0)};
  transform: ${({ willAnimate, isDesktop }) =>
    willAnimate && isDesktop ? 'translateY(50px)' : 'translateY(0)'};
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
  textBlock,
  alignText = 'left',
  srcMobile,
  src,
  srcAlt = '',
  buttonLabel = '',
  buttonLink = [],
  videoSrc = '',
  tint = false,
  marginTop = true,
  marginBottom = true,
  buttonCallback,
  buttonRef,
}: ImageAndTextBlockType): JSX.Element => {
  const [loadedSrc, setLoadedSrc] = useState('')
  const [loadedMobileSrc, setLoadedMobileSrc] = useState('')
  const [willAnimate, setWillAnimate] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [animate, setAnimate] = useState(false)
  const { setVideoSrc, pageTabIndex } = useContext(AppContext)
  const imageRef = useRef(null)
  const sectionRef = useRef(null)
  const isInViewport = useIsInViewport(sectionRef)
  let srcToLoad: string[] = []
  srcToLoad = srcMobile ? [srcMobile.asset.fluid.src] : srcToLoad
  srcToLoad = src ? [...srcToLoad, src.asset.fluid.src] : srcToLoad

  const [isLoaded] = useLazyLoadImages({
    ref: imageRef,
    src: srcToLoad,
    options: {
      threshold: 0,
      rootMargin: '80px',
    },
  })

  const handleCallback = (e: MouseEvent): void => {
    if (videoSrc && setVideoSrc) {
      setVideoSrc(videoSrc)
    }
    if (buttonCallback) {
      buttonCallback(e)
    }

    if (buttonLink.length) {
      navigate(buttonLink[0].slug.current)
    }
  }

  useEffect(() => {
    const inViewport = isInViewport()
    setIsDesktop(window.innerWidth >= 768)
    setWillAnimate(!inViewport)
    if (src && !srcMobile) {
      srcMobile = src
    }
  }, [])

  useEffect(() => {
    if (isLoaded && src && srcMobile) {
      setLoadedMobileSrc(srcMobile.asset.fluid.src)
      setLoadedSrc(src.asset.fluid.src)
      //  setTimeout(() => {
      setAnimate(true)
      // }, 0)
    }
  }, [isLoaded])

  return (
    <Section
      ref={sectionRef}
      tint={tint}
      marginTop={marginTop}
      marginBottom={marginBottom}
    >
      <SectionStyles data-text-align={alignText}>
        {src && videoSrc && (
          <Picture
            willAnimate={willAnimate}
            isDesktop={isDesktop}
            isLoaded={isLoaded}
            ref={imageRef}
            data-loaded={animate}
          >
            <source srcSet={loadedSrc} media="(min-width: 768px)" />
            <img src={loadedMobileSrc} alt={srcAlt} />
          </Picture>
        )}
        {src && !videoSrc && (
          <Picture
            willAnimate={willAnimate}
            isDesktop={isDesktop}
            isLoaded={isLoaded}
            ref={imageRef}
            data-loaded={animate}
          >
            <source srcSet={loadedSrc} media="(min-width: 500px)" />
            <img src={loadedMobileSrc} alt={srcAlt} />
          </Picture>
        )}
        <aside>
          <h2>{heading}</h2>
          {textBlock?.map(({ children }, i) => (
            <p key={i}>{children[0].text}</p>
          ))}
          {buttonLabel && (
            <Button
              label={buttonLabel}
              link={`/${buttonLink[0]?.slug?.current}`}
              icon={videoSrc ? <PlayIcon /> : null}
              callback={videoSrc || buttonCallback ? handleCallback : null}
              tabIndex={pageTabIndex}
              ref={buttonRef}
            />
          )}
        </aside>
      </SectionStyles>
    </Section>
  )
}

export default ImageAndTextBlock
