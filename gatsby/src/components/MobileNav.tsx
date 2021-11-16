import React, { FC, useContext, useEffect, MouseEvent } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import SocialNav from './SocialNav'
import AppContext from '../context/AppContext'
import {
  GutterPaddingLeft,
  GutterPaddingRight,
  WhiteHover,
} from '../assets/styles/Utils'
import { HeadingStyle } from '../assets/styles/Typography'
const StyledMobileNav = styled.div<{ active: boolean | undefined }>`
  position: fixed;
  display: ${({ active }) => (active ? 'block' : 'none')};
  ${GutterPaddingLeft}
  ${GutterPaddingRight}
  padding-top:15rem;
  padding-bottom: 4rem;
  top: 0;
  left: 0;
  bottom: 0;
  div {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: flex-start;
    justify-content: flex-start;
    height: 100%;
  }
  nav {
    flex-basis: 100%;
  }
  width: 100%;
  height: 100%;
  overflow: scroll;
  background-color: var(--green);
  color: var(--white);
  footer {
    flex-basis: 100%;
    align-self: flex-end;
    justify-self: flex-start;
    display: grid;
    gap: 1.5rem;
    grid-auto-rows: auto;
  }
  z-index: 2;
  ul {
    display: grid;
    grid-auto-rows: auto;
    gap: 1.5rem;
  }
  a {
    ${HeadingStyle}
    ${WhiteHover};
    font-size: var(--font-small);
    padding: 0.2rem 0.2rem 0.2em 0;
    line-height: 1;
  }
`

const MobileNav: FC = () => {
  const { menuActive, setMenuActive, setBodyNoScroll } = useContext(AppContext)

  const handleClick = (e: MouseEvent, url: string) => {
    e.preventDefault()
    if (setMenuActive) {
      setMenuActive(false)
    }
    navigate(url)
  }
  const handleResize = () => {
    if (
      menuActive &&
      setMenuActive &&
      setBodyNoScroll &&
      window.innerWidth >= 768
    ) {
      setMenuActive(false)
      setBodyNoScroll(false)
    }
  }

  useEffect(() => {
    if (menuActive) {
      window.addEventListener('resize', handleResize)
    } else {
      window.removeEventListener('resize', handleResize)
    }
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [menuActive])

  return (
    <StyledMobileNav active={menuActive}>
      <div>
        <nav>
          <ul>
            <li>
              <a onClick={e => handleClick(e, '/working-with-us')}>
                Working with us
              </a>
            </li>
            <li>
              <a onClick={e => handleClick(e, '/vacancies')}>Vacancies</a>
            </li>
            <li>
              <a onClick={e => handleClick(e, '/our-community')}>
                Our community
              </a>
            </li>
            <li>
              <a onClick={e => handleClick(e, '/')}>Terms and conditions</a>
            </li>
            <li>
              <a onClick={e => handleClick(e, '/')}>Privacy policy</a>
            </li>
          </ul>
        </nav>
        <footer>
          <address>
            Stonebridge Homes
            <br />
            Featherbank Court, Horsforth,
            <br />
            LS18 4QF, United Kingdon
          </address>
          <SocialNav />
        </footer>
      </div>
    </StyledMobileNav>
  )
}

export default MobileNav
