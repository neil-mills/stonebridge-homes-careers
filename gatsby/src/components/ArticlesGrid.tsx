import React, {
  useState,
  useEffect,
  useRef,
  MouseEvent,
  useContext,
} from 'react'
import styled from 'styled-components'
import ArticlesGridItem from './ArticlesGridItem'
import { ArticleType } from '../types'
import ArrowIcon from '../assets/svg/arrow-icon.svg'
import AppContext from '../context/AppContext'

const StyledCarouselButton = styled.button`
  background: var(--white);
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  cursor: pointer;
  &[data-dir='prev'] {
    left: 0;
    transform: translate(-50%, -50%) rotate(-180deg);
  }
  &[data-dir='next'] {
    transform: translateY(-50%);
    right: -20px;
  }
  svg path {
    fill: var(--grey);
  }
  &[disabled] {
    svg path {
      fill: var(--keyline-grey);
    }
    cursor: default;
  }
`
const StyledArticleGrid = styled.div``
const Track = styled.div`
  [data-carousel='false'] & {
    display: grid;
    gap: 2rem;
    row-gap: 2rem;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    @media screen and (min-width: 1024px) {
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
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
    display: grid;
    grid-auto-flow: column;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    scroll-snap-type: x mandatory;
    scroll-snap-align: start;
    scroll-behavior: smooth;
    &::-webkit-scrollbar {
      display: none;
    }
    --ms-overflow-style: none;
    scrollbar-width: none;
  }
`
interface ArticlesGridProps {
  carousel?: boolean
  articles: ArticleType[]
  perPage?: number
}

export const ArticlesGrid = React.forwardRef<HTMLDivElement, ArticlesGridProps>(
  ({ carousel = false, articles = [] }, ref) => {
    const trackRef = useRef<HTMLDivElement | null>(null)
    const articleRefs = useRef<HTMLElement[]>([])
    const [articleWidth, setArticleWidth] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)
    const [noScrollNext, setNoScrollNext] = useState(false)
    const [noScrollPrev, setNoScrollPrev] = useState(false)
    const [scrollWidth, setScrollWidth] = useState(0)
    const { pageTabIndex } = useContext(AppContext)
    const handleClick = (e: MouseEvent, dir: string) => {
      if (trackRef.current) {
        if (dir === 'prev' && !noScrollPrev) {
          trackRef.current.scrollBy(-articleWidth, 0)
        }
        if (dir === 'next' && !noScrollNext) {
          trackRef.current.scrollBy(articleWidth, 0)
        }
      }
    }
    const handleScroll = () => {
      if (trackRef.current) {
        setScrollLeft(trackRef.current.scrollLeft)
      }
    }

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
        const width =
          (trackWidth - articleMargin * (visibleArticles - 1)) / visibleArticles
        setArticleWidth(width)
        setScrollWidth(
          articles.length * (width + articleMargin) - articleMargin - trackWidth
        )
      }
    }

    useEffect(() => {
      setNoScrollNext(scrollLeft >= scrollWidth)
      setNoScrollPrev(scrollLeft === 0)
    }, [scrollLeft, scrollWidth])

    useEffect(() => {
      if (carousel && articles.length) {
        handleResize()
        handleScroll()
        window.addEventListener('resize', handleResize)
        return () => {
          window.removeEventListener('resize', handleResize)
        }
      }
    }, [])

    return (
      <>
        <StyledArticleGrid ref={ref} data-carousel={carousel}>
          {carousel && (
            <>
              <StyledCarouselButton
                data-dir="prev"
                disabled={noScrollPrev}
                onClick={e => handleClick(e, 'prev')}
                tabIndex={pageTabIndex}
              >
                <ArrowIcon />
              </StyledCarouselButton>
              <StyledCarouselButton
                data-dir="next"
                disabled={noScrollNext}
                onClick={e => handleClick(e, 'next')}
                tabIndex={pageTabIndex}
              >
                <ArrowIcon />
              </StyledCarouselButton>
            </>
          )}

          <Track ref={trackRef} onScroll={handleScroll}>
            {articles.map((article: ArticleType, i: number) => (
              <ArticlesGridItem
                key={i}
                ref={(element: HTMLElement) =>
                  (articleRefs.current[i] = element)
                }
                {...article}
                image={article.image}
                imageAlt={article.imageAlt}
                slug={article.slug}
                animateOnLoad={!carousel}
                width={carousel ? `${articleWidth}px` : 'auto'}
              />
            ))}
          </Track>
        </StyledArticleGrid>
      </>
    )
  }
)
ArticlesGrid.displayName = 'ArticlesGrid'
export default ArticlesGrid
