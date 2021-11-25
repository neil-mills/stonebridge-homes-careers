import React, { ReactNode, forwardRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { HeadingStyle, HeadingMedium } from '../assets/styles/Typography'
import PlayIcon from '../assets/svg/play.svg'
import { ArticleItemType } from '../types'

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
    margin-bottom: 0;
    @media screen and (min-width: 768px) {
      margin-bottom: 0;
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

const ArticleLink = ({
  link,
  children,
}: {
  link?: string
  children: ReactNode
}) => {
  return <>{link ? <Link to={link}>{children}</Link> : children}</>
}

const ArticleItem = forwardRef<HTMLElement, ArticleItemType>((props, ref) => {
  const {
    subTitle = '',
    date = '',
    title,
    link,
    video = false,
    image,
    imageAlt = '',
    width = 'auto',
  } = props

  return (
    <ArticleItemStyles ref={ref} style={{ width: `${width}` }}>
      <ArticleLink link={link}>
        <picture>
          <source
            media="(min-width: 500px)"
            srcSet={image.asset.fluid.srcSet}
          />
          {video && <PlayIcon />}
          <img src={image.asset.fluid.src} alt={imageAlt} />
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
ArticleItem.displayName = 'ArticleItem'
export default ArticleItem
