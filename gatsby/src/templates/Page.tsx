import React, { FC } from 'react'
import { graphql } from 'gatsby'

const Page: FC = ({ data, pageContext }) => {
  const contentBlocks = data.page.content
  return (
    <>
      Page
      {/* <h1>{data.page.title}</h1>
    {contentBlocks.map(block => (
      
    ))} */}
    </>
  )

  return <div></div>
}

export const query = graphql`
  query ($id: String!) {
    page: sanityPage(_id: { eq: $id }) {
      id
      title
      slug {
        current
      }
      content {
        name
        contentType {
          ... on SanityHeroBanner {
            _type
            heading
            text
            textPosition
            image {
              asset {
                fluid(maxWidth: 400) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            textBox
          }
          ... on SanityImageAndTextBlock {
            _type
            heading
            text
            image {
              asset {
                fluid(maxWidth: 400) {
                  ...GatsbySanityImageFluid
                }
              }
            }
            backgroundImage
            paralaxImage
            textBox
            textPosition
            buttonLabel
            pageLink {
              id
              title
            }
            externalUrl
          }
          ... on SanityNewsListBlock {
            _type
            heading
            articles
            archiveButton
          }
          ... on SanityPeopleListBlock {
            _type
            heading
            people
            archiveButton
          }
          ... on SanityQuoteListBlock {
            _type
            aboveHeading
            heading
            belowHeading
            quotes
            archiveButton
          }
          ... on SanityVacanciesListBlock {
            _type
            heading
            vacancies
            filter
            archiveButton
          }
          ... on SanityVideoAndTextBlock {
            _type
            heading
            text
            url
            textBox
            textPosition
            buttonLabel
            pageLink {
              id
            }
            externalUrl
          }
        }
      }
    }
  }
`

export default Page
