import React, { FC, useContext } from 'react'
import { graphql } from 'gatsby'
import HomeBanner from '../components/HomeBanner'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import ImageBanner from '../components/ImageBanner'
import ArticlesBlock from '../components/ArticlesBlock'
import ParallaxImage from '../components/ParallaxImage'
import TimelineList from '../components/TimelineList'
import KeylineGridBlock from '../components/KeylineGridBlock'
import Values from '../components/Values'
import SubContractor from '../components/SubContractor'
import VacancyList from '../components/VacancyList'
import Quotes from '../components/Quotes'
import AppContext from '../context/AppContext'
interface Props {
  pageContext: { id: string; title: string; slug: string }
}
const PageTemplate: FC<Props> = ({ data, pageContext }) => {
  const { title } = pageContext
  const { setDialogActive } = useContext(AppContext)

  return (
    <>
      {data.pages.nodes[0].content.map(({ contentType }, i: number) => {
        switch (contentType[0]._type) {
          case 'homeBanner':
            return (
              <HomeBanner
                key={i}
                title={contentType[0].heading}
                text={contentType[0].text}
                textMobile={contentType[0].textMobile}
                bgSrc={contentType[0].image.asset.fluid.src}
                bgSrcLg={contentType[0].imageDesktop.asset.fluid.src}
                btnLabel={contentType[0].buttonLabel}
                btnLink={contentType[0].buttonLink[0].slug.current}
                imageAlt={contentType[0].imageAlt}
              />
            )
          case 'imageAndTextBlock':
            return (
              <ImageAndTextBlock
                key={i}
                heading={contentType[0].heading}
                textBlock={contentType[0].textBlock}
                src={contentType[0].src}
                srcMobile={contentType[0].srcMobile}
                srcAlt={contentType[0].srcAlt}
                videoSrc={contentType[0].videoSrc}
                alignText={contentType[0].alignText}
                buttonLabel={contentType[0].buttonLabel}
                buttonLink={contentType[0].buttonLink}
                tint={contentType[0].tint}
              />
            )
          case 'imageBanner':
            return (
              <ImageBanner
                key={i}
                src={contentType[0].src.asset.fluid.src}
                srcMobile={contentType[0].srcMobile.asset.fluid.src}
                srcAlt={contentType[0].srcAlt}
                heading={contentType[0].heading}
                text={contentType[0].text}
                top={contentType[0].top}
                alignText={contentType[0].alignText}
                buttonLabel={contentType[0].buttonLabel}
                buttonLink={contentType[0].buttonLink}
                tint={contentType[0].tint}
              />
            )
          case 'articlesBlock':
            return (
              <ArticlesBlock
                key={i}
                subHeading={contentType[0].subHeading}
                heading={contentType[0].heading}
                text={contentType[0].text}
                headingLevel={contentType[0].headingLevel}
                showArticles={contentType[0].showArticles}
                selectedArticles={contentType[0].selectedArticles}
                articles={
                  contentType[0].dataSource === 'articles'
                    ? data.articles.nodes
                    : data.people.nodes
                }
                showCategories={contentType[0].showCategories}
                buttonLabel={contentType[0].buttonLabel}
                buttonLink={contentType[0].buttonLink}
                carousel={contentType[0].carousel}
                currentPage={contentType[0].currentPage}
                perPage={contentType[0].perPage}
              />
            )
          case 'parallaxImageBlock':
            return (
              <ParallaxImage
                key={i}
                title={contentType[0].title}
                src={contentType[0].src}
                srcLarge={contentType[0].srcLarge}
              />
            )
          case 'timelineBlock':
            return (
              <TimelineList
                key={i}
                sections={contentType[0].timelineSections}
              />
            )
          case 'keylineGridBlock':
            return <KeylineGridBlock key={i} {...contentType[0]} />
          case 'valuesBlock':
            return <Values key={i} {...contentType[0]} />
          case 'subContractorBlock':
            return <SubContractor key={i} {...contentType[0]} />
          case 'vacanciesListBlock':
            return <VacancyList key={i} {...contentType[0]} />
          case 'quoteListBlock':
            return <Quotes key={i} {...contentType[0]} />
          default:
            return null
        }
      })}
    </>
  )
}

export const query = graphql`
  query pageQuery($title: String) {
    pages: allSanityPage(filter: { title: { eq: $title } }) {
      nodes {
        id
        title
        content {
          contentType {
            ... on SanityHomeBanner {
              _key
              _type
              heading
              buttonLabel
              buttonLink {
                slug {
                  current
                }
              }
              text
              textMobile
              image {
                asset {
                  id
                  fluid(maxWidth: 375) {
                    srcWebp
                    src
                  }
                  originalFilename
                }
              }
              imageDesktop {
                asset {
                  id
                  fluid(maxWidth: 1600) {
                    srcWebp
                    src
                  }
                  originalFilename
                }
              }
              imageAlt
            }
            ... on SanityImageAndTextBlock {
              _key
              _type
              heading
              textBlock {
                children {
                  text
                }
              }
              alignText
              src {
                asset {
                  fluid {
                    srcSet
                    src
                  }
                }
              }
              srcMobile {
                asset {
                  fluid(maxWidth: 500) {
                    srcSet
                    src
                  }
                }
              }
              srcAlt
              buttonLabel
              buttonLink {
                slug {
                  current
                }
              }
              videoSrc
              buttonCallback
              tint
            }
            ... on SanityImageBanner {
              _key
              _type
              heading
              text
              alignText
              top
              tint
              srcMobile {
                asset {
                  fluid(maxWidth: 500) {
                    src
                  }
                }
              }
              src {
                asset {
                  fluid(maxWidth: 1600) {
                    src
                  }
                }
              }
              srcAlt
              buttonLabel
              buttonLink {
                slug {
                  current
                }
              }
            }
            ... on SanityArticlesBlock {
              _key
              _type
              subHeading
              heading
              text
              headingLevel
              dataSource
              showArticles
              carousel
              perPage
              showCategories
              buttonLabel
            }
            ... on SanityTimelineBlock {
              _type
              timelineSections {
                _key
                title
                items {
                  _key
                  highlighted
                  text
                  year
                }
              }
            }
            ... on SanityParallaxImageBlock {
              _key
              _type
              title
              src {
                asset {
                  fluid(maxWidth: 500) {
                    src
                  }
                }
              }
              srcLarge {
                asset {
                  fluid(maxWidth: 1600) {
                    src
                  }
                }
              }
            }
            ... on SanityKeylineGridBlock {
              _key
              _type
              heading
              headingLevel
              subHeading
              text
              tint
              marginTop
              marginBottom
              columns
              items {
                text
                title
                subTitle
                icon {
                  asset {
                    originalFilename
                    url
                    title
                  }
                }
                size
              }
            }
            ... on SanityValuesBlock {
              _type
              items {
                _key
                title
                icon {
                  asset {
                    url
                  }
                }
              }
              heading
              headingLevel
              subHeading
              text
              tint
            }
            ... on SanitySubContractorBlock {
              _type
              buttonLabel
              heading
              textBlock {
                children {
                  text
                }
              }
              tint
            }
            ... on SanityVacanciesListBlock {
              _type
              buttonLabel
              filter
              heading
              limit
              subHeading
              text
            }
            ... on SanityQuoteListBlock {
              _key
              _type
              headingLevel
              heading
              subHeading
              text
              quotes {
                quote
                id
                heading
                author
                image {
                  asset {
                    fixed {
                      src
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    articles: allSanityArticle(sort: { fields: date, order: DESC }) {
      nodes {
        id
        date(formatString: "D MMM YYYY")
        author
        title
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 500) {
              srcSet
              src
            }
          }
          crop {
            left
            right
            top
            bottom
          }
        }
        imageAlt
      }
    }
    people: allSanityPerson {
      nodes {
        subTitle
        title
        videoUrl
        videoLinkLabel
        slug {
          current
        }
        image {
          asset {
            fluid {
              src
              srcSet
            }
          }
        }
      }
    }
  }
`

export default PageTemplate
