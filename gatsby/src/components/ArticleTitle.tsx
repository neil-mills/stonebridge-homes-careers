import React, { FC, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import {
  VerticalSpacingTop,
  VerticalSpacingBottom,
} from '../assets/styles/Utils'

interface ArticleTitleProps {
  keyline?: boolean
  children?: ReactNode | ReactNode[]
}
const StyledArticleTitle = styled.div<ArticleTitleProps>`
  display: flex;
  ${VerticalSpacingTop}
  ${VerticalSpacingBottom}
  gap: 2rem;
  justify-content: space-between;
  ${({ keyline }) =>
    keyline &&
    css`
      border-bottom: 1px solid var(--keyline-grey);
      padding-bottom: 3rem;
    `};
  align-items: flex-start;
  button {
    display: none;
  }
  @media screen and (min-width: 768px) {
    ${({ keyline }) =>
      keyline &&
      css`
        padding-bottom: 4rem;
      `}
    button {
      display: block;
      margin: 0;
    }
  }
`
const ArticleTitle: FC<ArticleTitleProps> = ({ children, keyline = true }) => {
  const nodes = children instanceof Array ? children : [children]
  return (
    <StyledArticleTitle keyline={keyline}>
      {nodes.map(node => node)}
    </StyledArticleTitle>
  )
}

export default ArticleTitle
