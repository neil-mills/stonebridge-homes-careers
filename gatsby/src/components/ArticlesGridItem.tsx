import React, { FC, forwardRef, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { HeadingStyle, HeadingMedium } from '../assets/styles/Typography'
import PlayIcon from '../assets/svg/play.svg'
import { ArticleType } from '../types'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'
import { useIsInViewport } from '../hooks/useIsInViewport'

const ArticleItemStyles = styled.article<{
  willAnimate: boolean
  isLoaded: boolean
}>`
  background-color: var(--white);
  scroll-snap-align: start;
  width: 300px;
  opacity: 0;
  transition: opacity 500ms ease, transform 1s ease;
  transform: ${({ willAnimate }) =>
    willAnimate ? 'translateY(50px)' : 'translateY(0)'};
  &[data-loaded='true'] {
    transform: translate(0);
    opacity: 1;
  }
  picture {
    margin: 0;
    width: 100%;
    display: grid;
    align-items: center;
    svg {
      grid-area: 1 / 1 / 1 / 1;
      z-index: 1;
      justify-self: center;
    }
    img {
      width: 100%;
      height: auto;
      grid-area: 1 / 1 / 1 / 1;
    }
  }
  div {
    padding: 2rem 4rem 2rem 2rem;
    position: relative;
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
      margin: 0;
    }
  }
`

interface ArticleLinkType {
  link?: string
}

const ArticleLink: FC<ArticleLinkType> = ({ link, children }) => {
  return <>{link ? <Link to={link}>{children}</Link> : children}</>
}

const ArticleGridItem = forwardRef<HTMLElement, ArticleType>((props, ref) => {
  const {
    id,
    subTitle = '',
    date = '',
    title,
    videoUrl = '',
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
  const [isLoaded] = useLazyLoadImages({
    ref: imageRef,
    srcSet: image.asset.fluid.srcSet,
  })

  useEffect(() => {
    const inViewport = isInViewport()
    setWillAnimate(!inViewport)
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
      }, 500)
    }
  }, [isLoaded])

  return (
    <ArticleItemStyles
      willAnimate={willAnimate}
      isLoaded={isLoaded}
      ref={ref}
      style={{ width: `${width}` }}
      data-loaded={animate}
    >
      <ArticleLink link={`/articles/${id}`}>
        <picture ref={imageRef}>
          <source srcSet={srcSet} />

          <img src={src} alt={imageAlt} />
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
