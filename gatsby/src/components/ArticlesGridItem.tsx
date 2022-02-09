import React, {
  FC,
  forwardRef,
  useRef,
  useEffect,
  useState,
  useContext,
  MouseEvent,
} from 'react'
import styled from 'styled-components'
import { navigate, Link } from 'gatsby'
import { HeadingStyle, HeadingMedium } from '../assets/styles/Typography'
import PlayIcon from '../assets/svg/play.svg'
import { ArticleType } from '../types'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'
import { useIsInViewport } from '../hooks/useIsInViewport'
import AppContext from '../context/AppContext'

const ArticleItemStyles = styled.article<{
  willAnimate: boolean
  isLoaded: boolean
  imageY: number
}>`
  background-color: var(--white);
  scroll-snap-align: start;
  padding: 2px;
  width: 300px;
  opacity: ${({ willAnimate }) => (willAnimate ? 0 : 1)};
  transition: opacity 500ms ease, transform 1s ease;
  transform: ${({ willAnimate }) =>
    willAnimate ? 'translateY(50px)' : 'translateY(0)'};
  &[data-loaded='true'] {
    transform: translate(0);
    opacity: 1;
    img {
      opacity: 1;
    }
  }
  a {
    cursor: pointer;
    display: block;
    width: 100%;
    height: 100%;
  }
  button {
    border: none;
    border-radius: 0;
    background-color: transparent;
    cursor: pointer;
    display: block;
    text-align: left;
    padding: 0;
    width: 100%;
    display: block;
  }
  picture {
    margin: 0;
    width: 100%;
    background-color: var(--keyline-grey);
    align-items: center;

    position: relative;
    display: block;
    &:before {
      content: '';
      padding-top: 77%;
      display: block;
    }
    svg {
      grid-area: 1 / 1 / 1 / 1;
      z-index: 1;
      justify-self: center;
    }
    img {
      width: 100%;
      position: absolute;
      transition: opacity 500ms ease;
      opacity: ${({ willAnimate }) => (willAnimate ? 1 : 0)};
      top: 0;
      left: 0;
      height: 100%;
      object-fit: cover;
      object-position: ${({ imageY }) => `center ${imageY}%`};
    }
  }
  div {
    padding: 2rem 4rem 2rem 2rem;
    position: relative;
    white-space: break-spaces;
    svg {
      width: 2.5rem;
      height: 2.5rem;
      position: absolute;
      top: 2rem;
      right: 2rem;
      path {
        fill: var(--gold);
      }
    }
  }
  time,
  span {
    ${HeadingStyle}
    font-size: var(--font-xsmall);
    color: var(--gold);
    margin-bottom: 0.5rem;
    display: block;
    line-height: 1;
  }
  h3 {
    ${HeadingMedium}
    color: var(--green);
    margin: 0;
    @media screen and (min-width: 768px) {
      margin: 0;
    }
  }
  [data-carousel='true'] & {
    display: inline-block;
    margin-right: 2rem;
    &:last-child {
      margin-right: 0;
    }
  }
`

interface ArticleLinkType {
  link?: string
  videoSrc?: string
  videoLinkLabel?: string
  title?: string
  children: React.ReactNode
}

const ArticleLink = ({
  link,
  videoSrc,
  videoLinkLabel,
  title,
  children,
}: ArticleLinkType): JSX.Element => {
  const { setVideoSrc, pageTabIndex } = useContext(AppContext)
  const handleClick = (e: MouseEvent): void => {
    e.preventDefault()
    if (link) {
      navigate(link)
    }
    if (videoSrc && setVideoSrc) {
      setVideoSrc(videoSrc)
    }
  }
  if (videoSrc && setVideoSrc) {
    return (
      <button
        type="button"
        tabIndex={pageTabIndex}
        onClick={handleClick}
        aria-label={videoSrc ? videoLinkLabel : title}
      >
        {children}
      </button>
    )
  }
  return (
    <Link
      to={link || ''}
      tabIndex={pageTabIndex}
      onClick={handleClick}
      aria-label={videoSrc ? videoLinkLabel : title}
    >
      {children}
    </Link>
  )
}

const ArticleGridItem = forwardRef<HTMLElement, ArticleType>((props, ref) => {
  const {
    id,
    subTitle = '',
    date = '',
    title,
    videoUrl = '',
    videoLinkLabel = '',
    image,
    imageAlt = '',
    width = 'auto',
  } = props
  const [src, setSrc] = useState('')
  const [srcSet, setSrcSet] = useState('')
  const [willAnimate, setWillAnimate] = useState(false)
  const [animate, setAnimate] = useState(false)
  const imageRef = useRef<HTMLElement | null>(null)
  const isInViewport = useIsInViewport(imageRef)

  const [imageY, setImageY] = useState(50)
  const [isLoaded] = useLazyLoadImages({
    ref: imageRef,
    srcSet: image.asset.fluid.srcSet,
  })

  // useEffect(() => {
  //   const inViewport = isInViewport()
  //   const setToAnimate = !inViewport && props.animateOnLoad
  //   setWillAnimate(setToAnimate || false)
  //   if (image.crop) {
  //     const { top, bottom } = image.crop
  //     setImageY(Math.ceil(top * 100 + bottom * 100))
  //   }
  // }, [])

  // useEffect(() => {
  //   console.log('is loaded=', isLoaded)
  //   const inViewport = isInViewport()
  //   console.log('is in viewport=', inViewport)
  //   const setToAnimate = !inViewport && props.animateOnLoad
  //   setWillAnimate(setToAnimate || false)
  //   // setSrc('')
  //   // setSrcSet('')
  //   // setAnimate(false)
  //   if (isLoaded) {
  //     if (image.asset.fluid.srcSet) {
  //       setSrcSet(image.asset.fluid.srcSet)
  //     }
  //     if (image.asset.fluid.src) {
  //       setSrc(image.asset.fluid.src)
  //     }
  //     setTimeout(() => {
  //       setAnimate(true)
  //     }, 200)
  //   }
  //   return () => {
  //     clearTimeout()
  //   }
  // }, [isLoaded, image.asset.fluid.srcSet])

  useEffect(() => {
    const inViewport = isInViewport()
    const setToAnimate = !inViewport && props.animateOnLoad
    setWillAnimate(setToAnimate || false)

    if (image.crop) {
      const { top, bottom } = image.crop
      setImageY(Math.ceil(top * 100 + bottom * 100))
    }
    return () => {
      // setWillAnimate(false)
      // setAnimate(false)
    }
  }, [])

  useEffect(() => {
    if (isLoaded) {
      if (image.asset.fluid.srcSet) {
        setSrcSet(image.asset.fluid.srcSet)
      }
      if (image.asset.fluid.src) {
        setSrc(image.asset.fluid.src)
      }
      setTimeout(() => {
        setAnimate(true)
      }, 200)
      return () => {
        clearTimeout()
      }
    }
  }, [isLoaded, image.asset.fluid.srcSet])

  return (
    <ArticleItemStyles
      willAnimate={willAnimate}
      isLoaded={isLoaded}
      ref={ref}
      style={{ width: `${width}` }}
      data-loaded={animate}
      imageY={imageY}
    >
      <ArticleLink
        link={id ? `/articles/${id}` : ''}
        videoSrc={videoUrl}
        title={title}
        videoLinkLabel={videoLinkLabel}
      >
        <picture ref={imageRef}>
          {isLoaded && (
            <>
              <source srcSet={srcSet} />
              <img src={src} alt={videoUrl ? title : imageAlt} />
            </>
          )}
        </picture>
        <div>
          {date && <time dateTime="{date}">{date}</time>}
          {subTitle && <span>{subTitle}</span>}
          <h3>{title}</h3>
          {videoUrl && <PlayIcon />}
        </div>
      </ArticleLink>
    </ArticleItemStyles>
  )
})

ArticleGridItem.displayName = 'ArticleItem'
export default ArticleGridItem
