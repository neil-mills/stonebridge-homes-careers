import React, { useContext } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { Categories } from '../assets/components/Articles'
import { GutterPaddingRight } from '../assets/styles/Utils'
import { SecondaryButton } from '../assets/styles/Buttons'
import { ScrollableArea } from '../assets/styles/Utils'
import AppContext from '../context/AppContext'

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
  @media screen and (min-width: 768px) {
    ${GutterPaddingRight}
    ul {
      max-width: 1180px;
      margin: 0 auto;
    }
  }
`
const CategoryButton = styled.button`
  ${SecondaryButton}
`

const ArticleCategoryMenu = ({ categories }: Props): JSX.Element => {
  const { setCategoryId, categoryId, pageTabIndex } = useContext(AppContext)

  const handleClick = (id: string | null, url: string) => {
    if (setCategoryId) {
      setCategoryId(id ? [id] : [])
    }
    navigate(url)
  }

  return (
    <NavStyles>
      <ul>
        <li>
          <CategoryButton
            type="button"
            onClick={() => handleClick(null, '/our-community')}
            tabIndex={pageTabIndex}
            aria-label={'Show all articles'}
            aria-selected={categoryId === null || !categoryId.length}
          >
            All
          </CategoryButton>
        </li>
        {categories.map(({ id, slug, title }) => (
          <li key={slug.current}>
            <CategoryButton
              type="button"
              onClick={() =>
                handleClick(id, `/our-community/category/${slug.current}`)
              }
              tabIndex={pageTabIndex}
              aria-label={`Show articles related to ${title.toLowerCase()}`}
              aria-selected={categoryId?.includes(id)}
            >
              {title}
            </CategoryButton>
          </li>
        ))}
      </ul>
    </NavStyles>
  )
}

export default ArticleCategoryMenu
