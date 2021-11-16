import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { FontBold } from '../assets/styles/Typography'
import { WhiteHover } from '../assets/styles/Utils'
import MenuButton from './MenuButton'

const NavStyles = styled.nav`
  display: none;
  @media screen and (min-width: 768px) {
    display: block;
  }
  ul {
    display: flex;
    gap: 4rem;
    justify-content: flex-end;
    align-items: center;
  }
  a {
    ${FontBold}
    font-size: var(--font-small);
    text-transform: uppercase;
    transition: color 200ms ease;
    ${WhiteHover}
    &[aria-current] {
      color: var(--gold);
    }
  }
`

const Nav: FC = () => {
  return (
    <>
      <MenuButton />
      <NavStyles>
        <ul>
          <li>
            <Link to="/working-with-us">Working with us</Link>
          </li>
          <li>
            <Link to="/vacancies">Vacancies</Link>
          </li>
          <li>
            <Link to="/our-community">Our Community</Link>
          </li>
        </ul>
      </NavStyles>
    </>
  )
}

export default Nav
