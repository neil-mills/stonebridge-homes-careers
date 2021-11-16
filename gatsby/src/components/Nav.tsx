import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { FontBold } from '../assets/styles/Typography'
import { WhiteHover } from '../assets/styles/Utils'
import MenuButton from './MenuButton'
import { NavigationLink } from '../types/navigation'

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

interface NavProps {
  options: NavigationLink[]
}
const Nav: FC<NavProps> = ({ options }) => {
  return (
    <>
      <MenuButton />
      <NavStyles>
        <ul>
          {options.map((option: NavigationLink) => (
            <li key={option.slug.current}>
              <Link to={`/${option.slug.current}`}>{option.title}</Link>
            </li>
          ))}
        </ul>
      </NavStyles>
    </>
  )
}

export default Nav
