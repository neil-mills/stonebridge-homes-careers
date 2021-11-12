import React from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { SecondaryButton } from '../assets/styles/Buttons'

const MenuStyles = styled.nav`
  display: block;
  margin-top: 4rem;
  ul {
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: flex-end;
  }
  li {
    display: flex;
    align-items: flex-end;
  }
`
const MenuLink = styled(Link)`
  ${SecondaryButton}
`
const Dot = styled.div`
  width: 2px;
  height: 2px;
  margin-right: 2px;
  display: block;
  background-color: var(--green);
  &:last-child {
    margin: 0;
  }
`
interface Props {
  currentPage?: number
  pages: number
}

const PageMenu = ({ currentPage = 1, pages }: Props): JSX.Element => {
  return (
    <MenuStyles>
      <ul>
        <li>
          <MenuLink to={'/'}>Back</MenuLink>
        </li>
        <li>
          <MenuLink to={'/'}>1</MenuLink>
        </li>
        <li>
          <Dot />
          <Dot />
          <Dot />
        </li>
        {Array.from({ length: pages }).map((_, i: number) => (
          <MenuLink
            key={i + 1}
            to={'/'}
            aria-current={currentPage === i + 1 ? true : false}
          >
            {i + 1}
          </MenuLink>
        ))}
        <li>
          <Dot />
          <Dot />
          <Dot />
        </li>
        <li>
          <MenuLink to={'/'}>10</MenuLink>
        </li>
        <li>
          <MenuLink to={'/'}>Next</MenuLink>
        </li>
      </ul>
    </MenuStyles>
  )
}

export default PageMenu
