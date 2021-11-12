import React from 'react'
import styled from 'styled-components'
import Articles from './Articles'
import { ArticleItemType } from './ArticleItem'
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
    src: Person1,
    srcLarge: Person1,
    srcAlt: 'Person 1',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person2,
    srcLarge: Person2,
    srcAlt: 'Person 2',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person3,
    srcLarge: Person3,
    srcAlt: 'Person 3',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person4,
    srcLarge: Person4,
    srcAlt: 'Person 4',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person5,
    srcLarge: Person5,
    srcAlt: 'Person 5',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person6,
    srcLarge: Person6,
    srcAlt: 'Person 6',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person7,
    srcLarge: Person7,
    srcAlt: 'Person 7',
  },
  {
    subTitle: 'Title of role',
    title: 'Name fo person',
    src: Person8,
    srcLarge: Person8,
    srcAlt: 'Person 8',
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
