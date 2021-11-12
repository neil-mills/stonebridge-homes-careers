import React, { FC } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { HeadingLarge } from '../assets/styles/Typography'
import Tn1 from '../assets/images/community-tn-1.jpg'
import Tn2 from '../assets/images/community-tn-2.jpg'
import Tn3 from '../assets/images/community-tn-3.jpg'
import Articles from './Articles'
import { ArticleItemType } from './ArticleItem'
import Section from './Section'

const CommunityStyles = styled.section`
  background-color: var(--light-grey);
  h2 {
    ${HeadingLarge}
  }
`

const articles: ArticleItemType[] = [
  {
    subTitle: 'Date',
    subTitleDate: true,
    title: 'News title',
    link: '/article',
    src: Tn1,
    srcLarge: Tn1,
  },
  {
    subTitle: 'Date',
    subTitleDate: true,
    title: 'News title',
    link: '/article',
    src: Tn2,
    srcLarge: Tn2,
  },
  {
    subTitle: 'Date',
    subTitleDate: true,
    title: 'News title',
    link: '/article',
    src: Tn3,
    srcLarge: Tn3,
  },
  {
    subTitle: 'Date',
    subTitleDate: true,
    title: 'News title',
    link: '/article',
    src: Tn1,
    srcLarge: Tn1,
  },
  {
    subTitle: 'Date',
    subTitleDate: true,
    title: 'News title',
    link: '/article',
    src: Tn2,
    srcLarge: Tn2,
  },
  {
    subTitle: 'Date',
    subTitleDate: true,
    title: 'News title',
    link: '/article',
    src: Tn3,
    srcLarge: Tn3,
  },
]

interface CommunityProps {
  title: string
}

const Community: FC<CommunityProps> = ({ title }): JSX.Element => {
  return (
    <CommunityStyles>
      <Section tint={true}>
        <h2>{title}</h2>
        <Articles carousel={true} articles={articles} />
        <Button label={'View all news'} link={'/our-community'} />
      </Section>
    </CommunityStyles>
  )
}

export default Community
