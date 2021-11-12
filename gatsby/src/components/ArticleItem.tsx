import React, { ReactNode, forwardRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { HeadingStyle } from '../assets/styles/Typography'
import PlayIcon from '../assets/svg/play.svg'

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
    padding: 2rem 1rem;
  }
  h3,
  h4 {
    ${HeadingStyle}
  }
  h3 {
    font-size: var(--font-xsmall);
    color: var(--gold);
    margin-bottom: 0.5rem;
  }
  h4 {
    color: var(--green);
    margin-bottom: 0;
  }
  [data-carousel='true'] & {
    display: inline-block;
    margin-right: 2rem;
    &:last-child {
      margin: 0;
    }
  }
`

export interface ArticleItemType {
  children?: ReactNode
  subTitle?: string
  subTitleDate?: boolean
  title: string
  link?: string
  video?: boolean
  src: string
  srcLarge: string
  srcAlt?: string
  width?: string
}

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
    subTitleDate = false,
    title,
    link,
    video = false,
    src,
    srcLarge,
    srcAlt = '',
    width = 'auto',
  } = props
  return (
    <ArticleItemStyles ref={ref} style={{ width: `${width}` }}>
      <ArticleLink link={link}>
        <picture>
          <source media="(min-width: 768px)" srcSet={srcLarge} />
          {video && <PlayIcon />}
          <img src={src} alt={srcAlt} />
        </picture>
        <div>
          {subTitle && (
            <h3>
              {subTitleDate ? (
                <time dateTime="{subTitle}">{subTitle}</time>
              ) : (
                subTitle
              )}
            </h3>
          )}
          <h4>{title}</h4>
        </div>
      </ArticleLink>
    </ArticleItemStyles>
  )
})
ArticleItem.displayName = 'ArticleItem'
export default ArticleItem
