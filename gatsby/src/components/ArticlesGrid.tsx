import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ArticlesGridItem from './ArticlesGridItem'
import { ArticleType } from '../types'

const Track = styled.div`
  [data-carousel='false'] & {
    display: grid;
    gap: 2rem;
    row-gap: 2rem;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
      &[data-columns='2'] {
        grid-template-columns: repeat(2, 1fr);
      }
    }
    @media screen and (min-width: 1600px) {
      grid-template-columns: repeat(3, 1fr);
    }
    width: 100%;
  }
  [data-carousel='true'] & {
    display: block;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    --ms-overflow-style: none;
    scrollbar-width: none;
  }
`
interface ArticlesBlockProps {
  carousel?: boolean
  articles: ArticleType[]
  perPage?: number
}

const ArticlesBlock = ({
  carousel = false,
  articles = [],
}: ArticlesBlockProps): JSX.Element => {
  const trackRef = useRef<HTMLDivElement | null>(null)
  const articleRefs = useRef<HTMLElement[]>([])
  const [articleWidth, setArticleWidth] = useState(0)

  const handleResize = () => {
    const width = window.innerWidth
    let visibleArticles = 1
    if (width > 499) {
      visibleArticles = 2
    }
    if (width > 767) {
      visibleArticles = 3
    }

    if (trackRef.current) {
      const trackWidth: number = trackRef.current.clientWidth
      const articleMargin: number = parseFloat(
        getComputedStyle(articleRefs.current[0]).getPropertyValue(
          'margin-right'
        )
      )
      setArticleWidth(
        (trackWidth - articleMargin * (visibleArticles - 1)) / visibleArticles
      )
    }
  }

  useEffect(() => {
    if (carousel && articles.length) {
      window.addEventListener('resize', handleResize)
      handleResize()
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, [])

  return (
    <>
      <div data-carousel={carousel}>
        <Track ref={trackRef}>
          {articles.map((article: ArticleType, i: number) => (
            <ArticlesGridItem
              key={i}
              ref={(element: HTMLElement) => (articleRefs.current[i] = element)}
              {...article}
              image={article.image}
              imageAlt={article.imageAlt}
              slug={article.slug}
              width={carousel ? `${articleWidth}px` : 'auto'}
            />
          ))}
        </Track>
      </div>
    </>
  )
}

export default ArticlesBlock
