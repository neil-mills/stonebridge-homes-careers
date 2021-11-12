import React from 'react'
import styled from 'styled-components'
import { Categories } from '../assets/components/Articles'
import { FontMedium } from '../assets/styles/Typography'
import { Link } from 'gatsby'
import { SecondaryButton } from '../assets/styles/Buttons'
import { ScrollableArea } from '../assets/styles/Utils'

interface Props {
  categories: Categories[]
}

const NavStyles = styled.nav`
  display: block;
  margin-bottom: 4rem;
  ${ScrollableArea}
  ul {
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
  }
`
const CategoryButton = styled(Link)`
  ${SecondaryButton}
`

const ArticleCategoryMenu = ({ categories }: Props): JSX.Element => {
  return (
    <NavStyles>
      <ul>
        {categories.map(({ slug, title }) => (
          <li key={slug}>
            <CategoryButton to={'/'}>{title}</CategoryButton>
          </li>
        ))}
      </ul>
    </NavStyles>
  )
}

export default ArticleCategoryMenu
