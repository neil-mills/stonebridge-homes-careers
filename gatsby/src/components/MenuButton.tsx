import React, { useContext } from 'react'
import styled from 'styled-components'
import AppContext from '../context/AppContext'
const MenuButtonStyles = styled.button`
  padding: 0;
  background-color: transparent;
  border: none;
  display: block;
  width: 40px;
  height: 40px;
  padding: 10px;
  margin-right: -10px;
  position: relative;
  cursor: pointer;
  justify-self: right;
  @media screen and (min-width: 768px) {
    display: none;
  }
  span {
    display: block;
    position: absolute;
    width: 20px;
    height: 2px;
    transform-origin: 0 50%;
    opacity: 1;
    transition: all 200ms ease;
    will-change: opacity;
    background-color: var(--white);
    .on-white & {
      background-color: var(--black);
    }
    &:nth-child(1) {
      top: 10px;
      left: 10px;
    }
    &:nth-child(2) {
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    &:nth-child(3) {
      left: 10px;
      bottom: 10px;
    }
  }
  &[aria-expanded='true'] {
    span {
      &:nth-child(1) {
        transform: rotate(45deg);
        width: 26px;
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        width: 26px;
        transform: rotate(-45deg);
      }
    }
  }
`

const MenuButton = (): JSX.Element => {
  const { menuActive, setMenuActive, setBodyNoScroll } = useContext(AppContext)
  const handleClick = () => {
    if (setMenuActive) {
      setMenuActive(prevState => !prevState)
    }
    if (setBodyNoScroll) {
      setBodyNoScroll(prevState => !prevState)
    }
  }

  return (
    <MenuButtonStyles aria-expanded={menuActive} onClick={handleClick}>
      <span></span>
      <span></span>
      <span></span>
    </MenuButtonStyles>
  )
}

export default MenuButton
