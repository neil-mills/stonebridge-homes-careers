import React, { FC } from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'
import ArticleHeaderLinks from '../components/ArticleHeaderLinks'
import ArticleTitle from '../components/ArticleTitle'
import Section from '../components/Section'
import Heading from '../components/Heading'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import MetaList from '../components/MetaList'
import ArticlesBlock from '../components/ArticlesBlock'
import TextBlock from '../components/TextBlock'
import { ArticleType, TextBlockType, Art } from '../types'
import {
  VerticalSpacingTop,
  VerticalSpacingBottom,
} from '../assets/styles/Utils'
import ParallaxImage from '../components/ParallaxImage'

const StyledPicture = styled.picture`
  ${VerticalSpacingTop}
  ${VerticalSpacingBottom}
  display: block;
  width: 100%;
`

interface Props {
  data: {
    article: ArticleType
  }
  className: string
}

const SingleArticlePage: FC<Props> = ({ data, className }): JSX.Element => {
  console.log(data)
  return (
    <div className={className}>
      <Section as={'div'} marginTop={false}>
        <ArticleHeaderLinks backLink={'/our-community'} />
        <ArticleTitle keyline={false}>
          <div>
            <Heading
              subHeading={data.article.date}
              subHeadingDate={true}
              heading={data.article.title}
              marginBottom={false}
              headingLarger={true}
              level={1}
            />
            <MetaList
              meta={[`by ${data.article.author}`, '5 mins']}
              author={true}
            />
          </div>
        </ArticleTitle>
        <StyledPicture>
          <source
            media="(min-width: 500px)"
            srcSet={data.article.image.asset.fluid.srcSet}
          />
          <img src={data.article.image.asset.fluid.src} />
        </StyledPicture>
      </Section>
      {data.article.articleSectionType?.map(section => {
        console.log(section)

        switch (section._type) {
          case 'textBlock':
            return <TextBlock key={section._key} {...section} />
          case 'imageAndTextBlock':
            return <ImageAndTextBlock key={section._key} {...section} />
          case 'parallaxImageBlock':
            return <ParallaxImage key={section._key} {...section} />
          default:
            return null
        }
      })}
      {/*
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
        src={ArticleImage2}
        srcSet={ArticleImage2Lg}
        heading={'Title'}
        tint={true}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie'
        }
      />
      <ImageAndTextBlock
        src={ArticleImage3}
        srcSet={ArticleImage3Lg}
        heading={'Title'}
        alignText={'right'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie'
        }
      />
      <ParallaxImage src={ArticleImage4} srcLg={ArticleImage4Lg} />
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
        </ArticleSubSection> */}

      {/* <ArticlesBlock
        heading={'Our community'}
        carousel={true}
        articles={articlesData}
        buttonLabel={'More articles'}
        buttonLink={'/our-community'}
      />
      <ImageAndTextBlock
        heading={'Vacancies'}
        text={'Be a part of our amazing team at Stonebridge Homes'}
        buttonLabel={'View job vacancies'}
        buttonLink={'/'}
      /> */}
    </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    article: sanityArticle(id: { eq: $id }) {
      id
      title
      date
      slug {
        current
      }
      imageAlt
      image {
        asset {
          fluid {
            src
            srcSet
          }
        }
      }
      _id
      author
      articleSectionType {
        ... on SanityImageAndTextBlock {
          _key
          _type
          videoSrc
          tint
          sectionText: text
          srcAlt
          src {
            asset {
              fluid {
                srcSet
                src
              }
            }
          }
          heading
          buttonLabel
          buttonCallback
          alignText
          buttonLink {
            slug {
              current
            }
          }
        }
        ... on SanityParallaxImageBlock {
          _key
          _type
          src {
            asset {
              fluid {
                src
              }
            }
          }
          srcLarge {
            asset {
              fluid {
                src
              }
            }
          }
        }
        ... on SanityTextBlock {
          _key
          _type
          heading
          subHeading
          text {
            list
            style
            children {
              text
              _type
            }
          }
        }
      }
    }
  }
`
export default SingleArticlePage
