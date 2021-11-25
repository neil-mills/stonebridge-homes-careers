import React from 'react'
import styled from 'styled-components'
import Articles from './ArticlesGrid'
import { ArticleItemType } from '../types'
import { SectionGutter } from '../assets/styles/Utils'
import { HeadingLarge } from '../assets/styles/Typography'
import Section from './Section'
import Person1 from '../assets/images/person-1.jpg'
import Person2 from '../assets/images/person-2.jpg'
import Person3 from '../assets/images/person-3.jpg'
import Person4 from '../assets/images/person-4.jpg'
import Person5 from '../assets/images/person-5.jpg'
import Person6 from '../assets/images/person-6.jpg'
import Person7 from '../assets/images/person-7.jpg'
import Person8 from '../assets/images/person-8.jpg'

const articles: ArticleItemType[] = [
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person1,
          srcSet: Person1,
        },
      },
    },
    imageAlt: 'Person 1',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person2,
          srcSet: Person2,
        },
      },
    },
    imageAlt: 'Person 2',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person3,
          srcSet: Person3,
        },
      },
    },
    imageAlt: 'Person 3',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person4,
          srcSet: Person4,
        },
      },
    },
    imageAlt: 'Person 4',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person5,
          srcSet: Person5,
        },
      },
    },
    imageAlt: 'Person 5',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person6,
          srcSet: Person6,
        },
      },
    },
    imageAlt: 'Person 6',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person7,
          srcSet: Person7,
        },
      },
    },
    imageAlt: 'Person 7',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    image: {
      asset: {
        fluid: {
          src: Person8,
          srcSet: Person8,
        },
      },
    },
    imageAlt: 'Person 8',
  },
]

const PeopleStyles = styled.section`
  h2 {
    ${HeadingLarge}
  }
`
const People = (): JSX.Element => {
  return (
    <Section tint={true}>
      <PeopleStyles>
        <h2>Our people</h2>
        <Articles carousel={false} articles={articles} />
      </PeopleStyles>
    </Section>
  )
}

export default People
