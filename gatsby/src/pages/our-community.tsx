import React, { FC } from 'react'
import ImageBanner from '../components/ImageBanner'
import Banner from '../assets/images/community-banner.jpg'
import BannerLg from '../assets/images/community-banner-lg.jpg'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import articlesData from '../data/articles'
import Articles from '../components/Articles'

const CommunityPage: FC = (): JSX.Element => {
  return (
    <>
      <ImageBanner
        src={Banner}
        srcSet={BannerLg}
        heading={'Our Community'}
        tint={true}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit Lorem ipsum dolor '
        }
        alignText={'left'}
        top={true}
      />
      <Articles articles={articlesData} showCategories={true} />
      {/* <ArticlesStyle>
        {categories.length && <ArticleCategoryMenu categories={categories} />}
        <ArticlesWrapper>
          <SectionInner>
            <ArticlesGrid carousel={false} articles={articles} />
          </SectionInner>
        </ArticlesWrapper>
        <ButtonWrapper>
          <Button label={'Load more articles'} link={'/'} secondary={true} />
        </ButtonWrapper>
      </ArticlesStyle> */}
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
