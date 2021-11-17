import React, { FC } from 'react'
import { graphql } from 'gatsby'
import HomeBanner from '../components/HomeBanner'

interface Props {
  pageContext: { id: string; title: string; slug: string }
}
const PageTemplate: FC<Props> = ({ data, pageContext }) => {
  console.log('DATA=', data)
  const { title } = pageContext
  return (
    <>
      {data.pages.nodes[0].content.map(({ contentType }) => {
        console.log(contentType)
        switch (contentType[0]._type) {
          case 'homeBanner':
            return (
              <HomeBanner
                title={contentType[0].heading}
                text={contentType[0].text}
                bgSrc={contentType[0].image.asset.fluid.srcWebp}
                bgSrcLg={contentType[0].imageDesktop.asset.fluid.srcWebp}
                btnLabel={contentType[0].buttonLabel}
                btnLink={contentType[0].buttonLink[0].slug.current}
              />
            )
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
                  fluid(maxWidth: 1395) {
                    srcWebp
                    src
                  }
                  originalFilename
                }
              }
            }
            ... on SanityImageAndTextBlock {
              _key
              _type
            }
            ... on SanityNewsListBlock {
              _key
              _type
            }
            ... on SanityPeopleListBlock {
              _key
              _type
            }
            ... on SanityQuoteListBlock {
              _key
              _type
            }
            ... on SanityVacanciesListBlock {
              _key
              _type
            }
            ... on SanityVideoAndTextBlock {
              _key
              _type
            }
          }
        }
      }
    }
  }
`

export default PageTemplate
