import React, { FC } from 'react'
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
import { ArticleType } from '../types'
import categoriesData from '../data/categories'

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
  showCategories?: boolean
  buttonLabel?: string
  buttonLink?: string
  carousel?: boolean
  currentPage?: number
  className?: string
  perPage?: string
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
  buttonLabel = '',
  buttonLink = '',
  carousel = false,
  currentPage = 1,
  perPage = 'all',
  className = '',
}) => {
  const categories = categoriesData
  let filteredArticles: ArticleType[] =
    showArticles === 'selected' ? selectedArticles : articles
  const totalPages =
    perPage !== 'all'
      ? Math.ceil(filteredArticles.length / parseInt(perPage))
      : 1
  const articlesPerPage =
    perPage === 'all' ? filteredArticles.length : parseInt(perPage)
  const start = (currentPage - 1) * articlesPerPage
  filteredArticles = filteredArticles.filter(
    (article, i) => i >= start && i < start + articlesPerPage
  )
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
      {showCategories && categories.length && (
        <ArticleCategoryMenu categories={categories} />
      )}
      <ArticlesWrapper showCategories={showCategories}>
        <SectionInner>
          <ArticlesGrid carousel={carousel} articles={filteredArticles} />
        </SectionInner>
      </ArticlesWrapper>
      {currentPage !== totalPages && (
        <ButtonWrapper showCategories={showCategories}>
          <Button label={'Load more'} link={'/'} secondary={true} />
        </ButtonWrapper>
      )}
      {buttonLabel && buttonLink && (
        <SectionInner>
          <Button label={buttonLabel} link={buttonLink} />
        </SectionInner>
      )}
    </StyledArticles>
  )
}

export default Articles
