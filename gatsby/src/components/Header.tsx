import React, { FC, useContext, MouseEvent } from 'react'
import { navigate } from 'gatsby'
import styled from 'styled-components'
import Nav from './Nav'
import Logo from '../assets/images/stonebridge.png'
import { GutterPaddingLeft, GutterPaddingRight } from '../assets/styles/Utils'
import { NavigationLink } from '../types/navigation'
import AppContext from '../context/AppContext'

const HeaderStyles = styled.header`
  display: flex;
  height: 7.6rem;
  justify-content: space-between;
  align-items: center;
  background-color: var(--green);
  position: fixed;
  z-index: 5;
  top: 0;
  left: 0;
  width: 100%;
  ${GutterPaddingRight}
  ${GutterPaddingLeft}
`
const StyledLogo = styled.a`
  cursor: pointer;
  width: 170px;
  transition: width 200ms ease;
  height: auto;
  display: block;
  @media screen and (min-width: 1024px) {
    width: 203px;
  }
  img {
    width: 100%;
  }
`
const SkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: 0;
  display: inline-block;
  padding: 2px 10px;
  &:focus {
    background-color: var(--gold);
    color: var(--black);
    left: 0;
  }
`

interface HeaderProps {
  navOptions: NavigationLink[]
}

const Header: FC<HeaderProps> = ({
  navOptions,
}: {
  navOptions: NavigationLink[]
}) => {
  const { setActivePage, setMenuActive, pageTabIndex } = useContext(AppContext)

  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    if (setActivePage) {
      setActivePage(false)
    }
    if (setMenuActive) {
      setMenuActive(false)
    }
    navigate('/')
  }

  return (
    <HeaderStyles>
      <SkipLink href="#content">Skip to main content</SkipLink>
      <StyledLogo
        href={'#'}
        tabIndex={pageTabIndex}
        title={'Go to homepage'}
        onClick={handleClick}
      >
        <img src={Logo} alt="Stonebridge" />
      </StyledLogo>
      <Nav options={navOptions} />
    </HeaderStyles>
  )
}

export default Header
