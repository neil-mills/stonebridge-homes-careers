import React, {
  FC,
  useContext,
  useMemo,
  useLayoutEffect,
  useRef,
  useEffect,
} from 'react'
import styled, { css } from 'styled-components'
import {
  GutterPaddingTop,
  GutterPaddingBottom,
  GutterPaddingRight,
  GutterPaddingLeft,
} from '../assets/styles/Utils'
import { SectionInner } from './Section'
import ArticleCategoryMenu from './ArticleCategoryMenu'
import Heading from './Heading'
import ArticlesGrid from './ArticlesGrid'
import Button from './Button'
import { ArticleType, CategoryType } from '../types'
import AppContext from '../context/AppContext'

const StyledArticles = styled.section<{ showCategories: boolean }>`
  ${GutterPaddingTop}
  ${GutterPaddingBottom}
  ${GutterPaddingLeft}
  ${({ showCategories }) =>
    !showCategories
      ? GutterPaddingRight
      : css`
          margin-right: 0;
        `}
  background-color: var(--light-grey);
`

const StyledArticlesWrapper = styled.div<{ showCategories: boolean }>`
  ${({ showCategories }) => showCategories && GutterPaddingRight}
`

interface WrapperProps {
  showCategories: boolean
}
const ArticlesWrapper: FC<WrapperProps> = ({ children, showCategories }) => (
  <StyledArticlesWrapper showCategories={showCategories}>
    {children}
  </StyledArticlesWrapper>
)

interface ArticlesProps {
  subHeading?: string
  heading?: string
  text?: string
  headingLevel?: number
  showArticles?: string
  selectedArticles?: ArticleType[]
  articles?: ArticleType[]
  categories?: CategoryType[]
  showCategories?: boolean
  buttonLabel?: string
  buttonLink?: string
  carousel?: boolean
  currentPageCxt?: number | null
  currentArticle?: string | null
  className?: string
  isPaginated?: boolean
  dataSource?: string
  categoryIdCxt?: string[] | null
}

const Articles: FC<ArticlesProps> = ({
  subHeading = '',
  heading = '',
  text = '',
  headingLevel = 2,
  showArticles = 'latest',
  selectedArticles = [],
  articles = [],
  currentArticle = null,
  showCategories = false,
  categories = [],
  buttonLabel = '',
  buttonLink = '',
  carousel = false,
  className = '',
  categoryIdCxt = null,
}) => {
  const { pageTabIndex, categoryId, setCategoryId } = useContext(AppContext)

  const gridRef = useRef<HTMLDivElement | null>(null)

  const getFilteredArticles = (): ArticleType[] => {
    const pageSize: number = process.env.GATSBY_PAGE_SIZE
      ? parseInt(process.env.GATSBY_PAGE_SIZE)
      : 9
    let filtered: ArticleType[] =
      showArticles === 'selected' ? selectedArticles : articles
    const catId = !categoryId && categoryIdCxt ? categoryIdCxt : categoryId
    if (showCategories) {
      if (catId !== null && catId.length) {
        filtered = articles.filter(({ categories }) =>
          categories
            ? categories.map(c => c.id).some(id => catId.includes(id))
            : false
        )
      }

      const totalPages = Math.ceil(filtered.length / pageSize)
      let pagedArticles: ArticleType[][] = []

      //define the pages
      Array.from({ length: totalPages }).forEach((_, i) => {
        const skip = i * pageSize
        const limit = skip + pageSize
        pagedArticles = [
          ...pagedArticles,
          filtered.filter((_, index) => index >= skip && index < limit),
        ]
      })
    }

    return filtered
  }

  const scrollY = useMemo(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.scrollTop
    }
    return 0
  }, [ArticlesGrid])

  useLayoutEffect(() => {
    if (scrollY) {
      setTimeout(() => {
        if (typeof document !== 'undefined') {
          document.documentElement.scrollTop = scrollY
        }
      }, 0)
    }
  }, [scrollY, ArticlesGrid])

  useEffect(() => {
    if (!categoryIdCxt && setCategoryId) {
      setCategoryId(null)
    }
  })
  return (
    <StyledArticles className={className} showCategories={showCategories}>
      <SectionInner>
        {heading && (
          <Heading
            heading={heading}
            subHeading={subHeading}
            level={headingLevel}
            text={text}
            marginBottom={true}
          />
        )}
      </SectionInner>
      {showCategories && <ArticleCategoryMenu categories={categories} />}
      <ArticlesWrapper showCategories={showCategories}>
        <SectionInner>
          <ArticlesGrid
            carousel={carousel}
            articles={getFilteredArticles()}
            currentArticle={currentArticle}
            ref={gridRef}
          />
        </SectionInner>
      </ArticlesWrapper>

      {buttonLabel && buttonLink && (
        <SectionInner>
          <Button
            label={buttonLabel}
            tabIndex={pageTabIndex}
            link={buttonLink}
          />
        </SectionInner>
      )}
    </StyledArticles>
  )
}

export default Articles
