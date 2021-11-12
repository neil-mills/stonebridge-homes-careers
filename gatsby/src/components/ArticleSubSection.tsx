import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  children: React.ReactElement[]
}
const StyledArticleSubSection = styled.div`
  padding: 3rem 0;
  border: 1px solid var(--keyline-grey);
  border-width: 1px 0 0;
  &:last-child {
    padding-bottom: 0;
  }
`
const ArticleSubSection: FC<Props> = ({ children }) => {
  return (
    <StyledArticleSubSection>
      {children.length && children.map((child: React.ReactElement) => child)}
    </StyledArticleSubSection>
  )
}

export default ArticleSubSection
