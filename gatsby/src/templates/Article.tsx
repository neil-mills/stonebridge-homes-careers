import React, { FC, useState, useEffect, useRef } from 'react'
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
import { VerticalSpacingTop } from '../assets/styles/Utils'
import ParallaxImage from '../components/ParallaxImage'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'

interface Props {
  data: {
    article: ArticleType
    relatedArticles: {
      nodes: ArticleType[]
    }
  }
  className: string
}

const StyledPicture = styled.picture<{ imageY: number; isLoaded: boolean }>`
  ${VerticalSpacingTop}
  position: relative;
  background-color: var(--keyline-grey);
  display: block;
  max-height: 650px;
  height: auto;
  width: 100%;
  &:before {
    content: '';
    padding-top: 50%;
    display: block;
  }
  div {
    opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
    transition: opacity 500ms ease;
  }
  img {
    position: absolute;
    opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: ${({ imageY }) => `center ${imageY}%`};
  }
`
const SingleArticlePage: FC<Props> = ({ data, className }): JSX.Element => {
  const [imageY, setImageY] = useState(50)
  const imageRef = useRef<HTMLDivElement>(null)
  const [loadedSrc, setLoadedSrc] = useState('')
  const [loadedSrcSet, setLoadedSrcSet] = useState('')

  const [isLoaded] = useLazyLoadImages({
    ref: imageRef,
    srcSet: data.article.image.asset.fluid.srcSet,
    options: {
      threshold: 0,
      rootMargin: '0px',
    },
  })
  useEffect(() => {
    if (data.article.image.crop) {
      const { top, bottom } = data.article.image.crop
      setImageY(Math.ceil(top * 100 + bottom * 100))
    }
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.scrollTo(0, 0)
      }, 0)
    }
    return () => clearTimeout()
  }, [])

  useEffect(() => {
    if (isLoaded) {
      console.log('image is loaded')
      if (data.article.image.asset.fluid.srcSet) {
        setLoadedSrcSet(data.article.image.asset.fluid.srcSet)
      }
      if (data.article.image.asset.fluid.src) {
        setLoadedSrc(data.article.image.asset.fluid.src)
      }
    }
  }, [isLoaded])

  return (
    <div className={className}>
      <Section as={'div'} marginTop={false} marginBottom={false}>
        <ArticleHeaderLinks backLink={'/our-community'} />
        <ArticleTitle keyline={!data.article.showImage}>
          <div>
            <Heading
              subHeading={data.article.date}
              subHeadingDate={true}
              heading={data.article.title}
              marginBottom={false}
              headingLarger={true}
              level={1}
            />
            {data.article.author && (
              <MetaList meta={[`by ${data.article.author}`]} author={true} />
            )}
          </div>
        </ArticleTitle>
        {data.article.showImage && data.article.image && (
          <StyledPicture imageY={imageY} ref={imageRef} isLoaded={isLoaded}>
            <div>
              <source media="(min-width: 500px)" srcSet={loadedSrcSet} />
              <img src={loadedSrc} alt={data.article.imageAlt} />
            </div>
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
        id
        imageAlt
        date(formatString: "D MMM YYYY")
        title
        slug {
          current
        }
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
      showImage
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
        crop {
          left
          right
          top
          bottom
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
          title
        }
        ... on SanityTextBlock {
          _key
          _type
          heading
          subHeading
          _rawText
        }
      }
    }
  }
`

export default SingleArticlePage
