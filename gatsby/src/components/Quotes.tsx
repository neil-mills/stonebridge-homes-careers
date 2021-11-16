import React from 'react'
import styled from 'styled-components'
import Avatar from '../assets/images/avatar.jpg'
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

interface QuoteProps {
  title: string
  quote: string
  name: string
  avatar: string
}
const Quote = ({ title, quote, name, avatar }: QuoteProps): JSX.Element => {
  return (
    <QuoteStyles>
      <div>
        <h3>{title}</h3>
        <blockquote>{quote}</blockquote>
      </div>
      <footer>
        <MetaList meta={[name]} avatar={avatar} author={true} />
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

const Quotes = (): JSX.Element => {
  return (
    <Section marginBottom={false}>
      <Heading
        subHeading={'Did you know?'}
        heading={'Employees love it here'}
      />
      <GridWrapper>
        <KeylineGrid columns={2}>
          <KeylineGridItem>
            <Quote
              title={'Really nice people'}
              quote={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget
        in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem
        adipiscing sed. Volutpat, vitae fusce facilisi tempus donec alique`}
              name={'Sarah Jones, Leeds'}
              avatar={Avatar}
            />
          </KeylineGridItem>
          <KeylineGridItem>
            <Quote
              title={'Really nice people'}
              quote={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        aliquam justo, ut molestie elit nisl risus. `}
              name={'Sarah Jones, Leeds'}
              avatar={Avatar}
            />
          </KeylineGridItem>
          <KeylineGridItem>
            <Quote
              title={'Really nice people'}
              quote={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget
        in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem
        adipiscing sed. Volutpat, vitae fusce facilisi tempus donec alique`}
              name={'Sarah Jones, Leeds'}
              avatar={Avatar}
            />
          </KeylineGridItem>
          <KeylineGridItem>
            <Quote
              title={'Really nice people'}
              quote={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget
        in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem
        adipiscing sed. Volutpat, vitae fusce facilisi tempus donec alique`}
              name={'Sarah Jones, Leeds'}
              avatar={Avatar}
            />
          </KeylineGridItem>
          <KeylineGridItem>
            <Quote
              title={'Really nice people'}
              quote={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        aliquam justo, ut molestie elit nisl risus.`}
              name={'Sarah Jones, Leeds'}
              avatar={Avatar}
            />
          </KeylineGridItem>
          <KeylineGridItem>
            <Quote
              title={'Really nice people'}
              quote={`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales
        aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget
        in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem
        adipiscing sed. Volutpat, vitae fusce facilisi tempus donec alique`}
              name={'Sarah Jones, Leeds'}
              avatar={Avatar}
            />
          </KeylineGridItem>
        </KeylineGrid>
      </GridWrapper>
    </Section>
  )
}

export default Quotes
