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
import { ArticleType } from '../types'
import {
  VerticalSpacingTop,
  VerticalSpacingBottom,
} from '../assets/styles/Utils'
import ParallaxImage from '../components/ParallaxImage'

interface Props {
  data: {
    article: ArticleType
    relatedArticles: {
      nodes: ArticleType[]
    }
  }
  className: string
}

const StyledPicture = styled.picture`
  ${VerticalSpacingTop}
  ${VerticalSpacingBottom}
  position: relative;
  display: block;
  max-height: 650px;
  height: auto;
  width: 100%;
  &:before {
    content: '';
    padding-top: 77%;
    display: block;
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
  }
`
const SingleArticlePage: FC<Props> = ({ data, className }): JSX.Element => {
  return (
    <div className={className}>
      <Section as={'div'} marginTop={false} marginBottom={false}>
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
        {data.article.image && (
          <StyledPicture>
            <source
              media="(min-width: 500px)"
              srcSet={data.article.image.asset.fluid.srcSet}
            />
            <img src={data.article.image.asset.fluid.src} />
          </StyledPicture>
        )}
      </Section>
      {data.article.articleSectionType &&
        data.article.articleSectionType?.map((section, i) => {
          switch (section._type) {
            case 'textBlock':
              return (
                <TextBlock
                  key={section._key}
                  {...section}
                  marginTop={i === 0 ? false : true}
                />
              )
            case 'imageAndTextBlock':
              return (
                <ImageAndTextBlock
                  key={section._key}
                  {...section}
                  marginTop={i === 0 ? false : true}
                />
              )
            case 'parallaxImageBlock':
              return <ParallaxImage key={section._key} {...section} />
            default:
              return null
          }
        })}
      <ArticlesBlock
        heading={'More articles'}
        showArticles={'selected'}
        selectedArticles={data.relatedArticles.nodes}
        buttonLabel={'View all articles'}
        buttonLink={'/our-community'}
      />
    </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    relatedArticles: allSanityArticle(limit: 3, filter: { _id: { ne: $id } }) {
      nodes {
        _id
        imageAlt
        date(formatString: "D MMM YYYY")
        title
        image {
          asset {
            fluid {
              srcSet
              src
            }
          }
        }
      }
    }
    article: sanityArticle(id: { eq: $id }) {
      id
      title
      date(formatString: "D MMM YYYY")
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
          textBlock {
            children {
              text
            }
          }
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
