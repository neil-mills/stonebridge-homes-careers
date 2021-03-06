import React, { FC } from 'react'
import styled from 'styled-components'
import Section from '../components/Section'
import Heading from '../components/Heading'
import ArticleHeaderLinks from '../components/ArticleHeaderLinks'
import MetaList from '../components/MetaList'
import ArticleImage1 from '../assets/images/article-img-1.jpg'
import ArticleImage1Lg from '../assets/images/article-img-1-lg.jpg'
import ArticleImage2 from '../assets/images/article-img-2.jpg'
import ArticleImage2Lg from '../assets/images/article-img-2-lg.jpg'
import ArticleImage3 from '../assets/images/article-img-3.jpg'
import ArticleImage3Lg from '../assets/images/article-img-3-lg.jpg'
import ArticleImage4 from '../assets/images/article-img-4.jpg'
import ArticleImage4Lg from '../assets/images/article-img-4-lg.jpg'
import {
  VerticalSpacingTop,
  VerticalSpacingBottom,
} from '../assets/styles/Utils'
import ArticleTitle from '../components/ArticleTitle'
import ArticleSubSection from '../components/ArticleSubSection'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import ParallaxImage from '../components/ParallaxImage'
import ArticlesBlock from '../components/ArticlesBlock'
import articlesData from '../data/articles'

const StyledPicture = styled.picture`
  ${VerticalSpacingTop}
  ${VerticalSpacingBottom}
  display: block;
  width: 100%;
`
const ArticlePage: FC = (): JSX.Element => {
  return (
    <div>
      <Section as={'div'} marginTop={false}>
        <ArticleHeaderLinks backLink={'/our-community'} />
        <ArticleTitle keyline={false}>
          <div>
            <Heading
              subHeading={'Date'}
              subHeadingDate={true}
              heading={'News title'}
              marginBottom={false}
              headingLarger={true}
              level={1}
            />
            <MetaList meta={['by John Smith', '5 mins']} author={true} />
          </div>
        </ArticleTitle>
        <StyledPicture>
          <source media="(min-width: 500px)" srcSet={ArticleImage1Lg} />
          <img src={ArticleImage1} />
        </StyledPicture>

        <h2>Title</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
          sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis
          neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu
          arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus
          donec alique
        </p>
      </Section>

      <ImageAndTextBlock
        src={{
          asset: {
            fluid: {
              src: ArticleImage2,
              srcSet: ArticleImage2Lg,
            },
          },
        }}
        heading={'Title'}
        tint={true}
        sectionText={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie'
        }
      />
      <ImageAndTextBlock
        src={{
          asset: {
            fluid: {
              src: ArticleImage3,
              srcSet: ArticleImage3Lg,
            },
          },
        }}
        heading={'Title'}
        alignText={'right'}
        sectionText={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie'
        }
      />
      <ParallaxImage
        src={{
          asset: {
            fluid: {
              src: ArticleImage4,
            },
          },
        }}
        srcLarge={{
          asset: {
            fluid: {
              src: ArticleImage4Lg,
            },
          },
        }}
      />
      <Section>
        <h2>Title</h2>
        <ArticleSubSection>
          <h3>Subtitle</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
            sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis
            neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor
            arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi
            tempus donec alique
          </p>
        </ArticleSubSection>
        <ArticleSubSection>
          <h3>Subtitle</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas
            sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis
            neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor
            arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi
            tempus donec alique
          </p>
        </ArticleSubSection>
      </Section>
      <ArticlesBlock
        heading={'Our community'}
        carousel={true}
        articles={articlesData}
        buttonLabel={'More articles'}
        buttonLink={'/our-community'}
      />
      <ImageAndTextBlock
        heading={'Vacancies'}
        sectionText={'Be a part of our amazing team at Stonebridge Homes'}
        buttonLabel={'View job vacancies'}
        buttonLink={'/'}
      />
    </div>
  )
}

export default ArticlePage
