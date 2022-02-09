import React, {
  FC,
  useContext,
  useMemo,
  useLayoutEffect,
  useRef,
  useEffect,
  useState,
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
import { navigate } from 'gatsby'

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
const StyledButtonWrapper = styled.div<{ showCategories: boolean }>`
  display: flex;
  justify-content: center;
  ${({ showCategories }) =>
    showCategories
      ? GutterPaddingRight
      : css`
          margin-right: 0;
        `}
`

interface WrapperProps {
  showCategories: boolean
}
const ArticlesWrapper: FC<WrapperProps> = ({ children, showCategories }) => (
  <StyledArticlesWrapper showCategories={showCategories}>
    {children}
  </StyledArticlesWrapper>
)
const ButtonWrapper: FC<WrapperProps> = ({ children, showCategories }) => (
  <StyledButtonWrapper showCategories={showCategories}>
    {children}
  </StyledButtonWrapper>
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
  currentPageCxt?: number
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
  showCategories = false,
  categories = [],
  buttonLabel = '',
  buttonLink = '',
  carousel = false,
  className = '',
  // currentPageCxt = null,
  categoryIdCxt = null,
  // dataSource = '',
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
    // if (catId && setCategoryId) setCategoryId(catId)
    if (showCategories) {
      //filter by category if set
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

  const showMore = () => {
    navigate('/our-community/page/3')
    // if (setCurrentPage) {
    //   console.log('show more')
    //   setCurrentPage(prevState => prevState + 1)
    // }
    // setFilteredArticles([...filteredArticles, filteredArticles[0]])
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
            ref={gridRef}
          />
        </SectionInner>
      </ArticlesWrapper>

      {/* <ButtonWrapper showCategories={showCategories}>
        <Button
          label={'Load more'}
          link={'/'}
          secondary={true}
          tabIndex={pageTabIndex}
          callback={showMore}
        />
      </ButtonWrapper> */}

      {buttonLabel && buttonLink && (
        <SectionInner>
          <Button
            label={buttonLabel}
            tabIndex={pageTabIndex}
            callback={() => showMore}
          />
        </SectionInner>
      )}
    </StyledArticles>
  )
}

export default Articles
