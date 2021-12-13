import React, { FC } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import KeylineGrid, { KeylineGridItem } from './KeylineGrid'
import Section from './Section'
import Heading from './Heading'
import MetaList from './MetaList'
import { HeadingMedium } from '../assets/styles/Typography'

const QuoteStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h3 {
    ${HeadingMedium}
  }
  blockquote {
    padding: 0;
    margin: 0 0 3rem;
    @media screen and (min-width: 768px) {
      margin: 0 0 4vw 0;
    }
  }
  footer {
    justify-self: flex-end;
    font-size: var(--font-xsmall);
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`

interface Quote {
  id?: string
  heading?: string
  quote: string
  author: string
  image?: {
    asset: {
      fixed: {
        src: string
      }
    }
  }
}

interface Props {
  subHeading?: string
  heading?: string
  text?: string
  headingLevel?: number
  quotes: Quote[]
}
const Quote = ({ heading, quote, author, image }: Quote): JSX.Element => {
  return (
    <QuoteStyles>
      <div>
        {heading && <h3>{heading}</h3>}
        <blockquote>{quote}</blockquote>
      </div>
      <footer>
        <MetaList
          meta={[author]}
          avatar={image?.asset.fixed.src}
          author={true}
        />
      </footer>
    </QuoteStyles>
  )
}

const GridWrapper = styled.div`
  border-top: 1px solid var(--keyline-grey);
  margin-top: 3.5rem;
  @media screen and (min-width: 768px) {
    margin-top: 5vw;
  }
`

const Quotes: FC<Props> = props => {
  const { quotes } = useStaticQuery(graphql`
    query {
      quotes: allSanityQuoteItem {
        nodes {
          heading
          id
          quote
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
  `)
  const selectedQuotes: Quote[] = props.quotes || quotes.nodes
  if (!selectedQuotes.length) return null
  return (
    <Section marginBottom={false}>
      {props.heading && (
        <Heading
          subHeading={props.subHeading}
          heading={props.heading}
          text={props.text}
          level={props.headingLevel}
        />
      )}
      <GridWrapper>
        <KeylineGrid columns={4}>
          {selectedQuotes.map((quote: Quote) => (
            <KeylineGridItem key={quote.id}>
              <Quote
                heading={quote.heading}
                quote={quote.quote}
                author={quote.author}
                image={quote.image}
              />
            </KeylineGridItem>
          ))}
        </KeylineGrid>
      </GridWrapper>
    </Section>
  )
}

export default Quotes
