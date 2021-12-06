import React, { FC, forwardRef, useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { HeadingStyle, HeadingMedium } from '../assets/styles/Typography'
import PlayIcon from '../assets/svg/play.svg'
import { ArticleType } from '../types'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'

const ArticleItemStyles = styled.article`
  background-color: var(--white);
  scroll-snap-align: start;
  width: 300px;
  picture {
    margin: 0;
    width: 100%;
    display: block;
    img {
      width: 100%;
      height: auto;
    }
  }
  div {
    padding: 2rem;
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
    videoSrc = '',
    image,
    imageAlt = '',
    width = 'auto',
  } = props
  const [src, setSrc] = useState('')
  const [srcSet, setSrcSet] = useState('')
  const imageRef = useRef<HTMLElement | null>(null)
  const [isLoaded] = useLazyLoadImages(imageRef, image.asset.fluid.srcSet)

  useEffect(() => {
    if (isLoaded) {
      console.log('loaded srcset, show image')
      if (image.asset.fluid.srcSet) {
        setSrcSet(image.asset.fluid.srcSet)
      }
      if (image.asset.fluid.src) {
        setSrc(image.asset.fluid.src)
      }
    }
  }, [isLoaded])
  return (
    <ArticleItemStyles ref={ref} style={{ width: `${width}` }}>
      <ArticleLink link={`/articles/${id}`}>
        <picture ref={imageRef}>
          <source srcSet={srcSet} />
          {videoSrc && <PlayIcon />}
          <img src={src} alt={imageAlt} />
        </picture>
        <div>
          {date && <time dateTime="{date}">{date}</time>}
          {subTitle && <span>{subTitle}</span>}
          <h3>{title}</h3>
        </div>
      </ArticleLink>
    </ArticleItemStyles>
  )
})

ArticleGridItem.displayName = 'ArticleItem'
export default ArticleGridItem
