import React, { FC } from 'react'
import Section from '../components/Section'
import { Link, graphql } from 'gatsby'
import ArticlesBlock from '../components/ArticlesBlock'
import { ArticleType } from '../types'
const browser = typeof window !== 'undefined' && window

interface Props {
  data: {
    articles: {
      nodes: ArticleType[]
    }
  }
  className: string
}
const FourOFour: FC<Props> = ({ data }) => {
  console.log(data)
  return browser ? (
    <>
      <Section as={'div'} marginTop={false} marginBottom={true}>
        <h1>Page not found</h1>
        <p>
          This page does not exist or may have been moved.{' '}
          <Link to={'/'}>Click here</Link> to return to the home page.
        </p>
      </Section>

      <ArticlesBlock
        heading={'Our community'}
        headingLevel={2}
        articles={data.articles.nodes}
        carousel={true}
      />
    </>
  ) : null
}

export const query = graphql`
  query {
    articles: allSanityArticle {
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
  }
`

export default FourOFour
