import React, { FC } from 'react'
import styled from 'styled-components'
import ImageBanner from '../components/ImageBanner'
import Banner from '../assets/images/community-banner.jpg'
import ArticleCategoryMenu from '../components/ArticleCategoryMenu'
import BannerLg from '../assets/images/community-banner-lg.jpg'
import Tn1 from '../assets/images/community-tn-1.jpg'
import Tn2 from '../assets/images/community-tn-2.jpg'
import Tn3 from '../assets/images/community-tn-3.jpg'
import Articles, { Categories } from '../components/Articles'
import Button from '../components/Button'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import { SectionInner } from '../components/Section'
import { ArticleItemType } from '../components/ArticleItem'
import {
  GutterPaddingTop,
  GutterPaddingBottom,
  GutterPaddingRight,
  GutterPaddingLeft,
} from '../assets/styles/Utils'

const articles: ArticleItemType[] = [
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn1,
    srcLarge: Tn1,
    srcAlt: 'Person 1',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn2,
    srcLarge: Tn2,
    srcAlt: 'Person 2',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn3,
    srcLarge: Tn3,
    srcAlt: 'Person 3',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn1,
    srcLarge: Tn1,
    srcAlt: 'Person 4',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn2,
    srcLarge: Tn2,
    srcAlt: 'Person 5',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn3,
    srcLarge: Tn3,
    srcAlt: 'Person 6',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn1,
    srcLarge: Tn1,
    srcAlt: 'Person 7',
    link: '/article',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Tn2,
    srcLarge: Tn2,
    srcAlt: 'Person 8',
    link: '/article',
  },
]

const categories: Categories[] = [
  { slug: 'all', title: 'All' },
  { slug: 'homes', title: 'Homes' },
  { slug: 'covid-19', title: 'Covid-19' },
  { slug: 'careers', title: 'Careers' },
]

const ArticlesStyle = styled.section`
  ${GutterPaddingTop}
  ${GutterPaddingBottom}
  ${GutterPaddingLeft}
  background-color: var(--light-grey);
`
const ArticlesWrapper = styled.div`
  ${GutterPaddingRight}
`
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  ${GutterPaddingRight}
`

const CommunityPage: FC = (): JSX.Element => {
  return (
    <>
      <ImageBanner
        src={Banner}
        srcLarge={BannerLg}
        heading={'Our Community'}
        tint={true}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit Lorem ipsum dolor '
        }
        alignText={'left'}
        top={true}
      />
      <ArticlesStyle>
        {categories.length && <ArticleCategoryMenu categories={categories} />}
        <ArticlesWrapper>
          <SectionInner>
            <Articles carousel={false} articles={articles} />
          </SectionInner>
        </ArticlesWrapper>
        <ButtonWrapper>
          <Button label={'Load more articles'} link={'/'} secondary={true} />
        </ButtonWrapper>
      </ArticlesStyle>
      <ImageAndTextBlock
        heading={'Vacancies'}
        text={'Be a part of our amazing team at Stonebridge Homes'}
        buttonLabel={'View job vacancies'}
        buttonLink={'/'}
      />
    </>
  )
}

export default CommunityPage
