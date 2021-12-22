import React, { FC, MouseEvent, useState, useEffect, useRef } from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { FontBold } from '../assets/styles/Typography'
import MenuButton from './MenuButton'
import { NavigationLink } from '../types/navigation'

const NavStyles = styled.nav<{ left: number; width: number }>`
  display: none;
  height: 100%;
  position: relative;
  @media screen and (min-width: 768px) {
    display: block;
  }
  ul {
    display: flex;
    gap: 4rem;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  li {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    &[data-active='true'] {
      /* &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--gold);
      } */
    }
  }
  a {
    color: var(--white);
    ${FontBold}
    font-size: var(--font-small);
    text-transform: uppercase;
    transition: color 200ms ease;
    &:hover,
    &:active,
    &:focus,
    &[aria-current] {
      color: var(--gold);
    }
  }
  span {
    display: block;
    height: 3px;
    ${({ left, width }) => css`
      left: ${left}px;
      width: ${width}px;
    `}
    background-color: var(--gold);
    position: absolute;
    bottom: 0;
    transition: left 200ms ease, width 200ms ease;
  }
`

interface NavProps {
  options: NavigationLink[]
}

const Nav: FC<NavProps> = ({ options }) => {
  const [activeLeft, setActiveLeft] = useState(0)
  const [activeWidth, setActiveWidth] = useState(0)
  const [hoverLeft, setHoverLeft] = useState(0)
  const [hoverWidth, setHoverWidth] = useState(0)
  const liRefs = useRef<HTMLLIElement[]>([])
  let delay: ReturnType<typeof setTimeout> | null = null

  const handleHover = (e: MouseEvent) => {
    if (delay) clearTimeout(delay)
    if ((e.target as HTMLAnchorElement).parentElement) {
      const parent = (e.target as HTMLAnchorElement).parentElement
      if (parent) {
        const width: number = parent.clientWidth
        const left = parent.offsetLeft
        setHoverLeft(left)
        setHoverWidth(width)
      }
    }
  }

  const handleLeave = () => {
    delay = setTimeout(() => {
      setHoverWidth(activeWidth)
      setHoverLeft(activeLeft)
    }, 500)
  }

  useEffect(() => {
    liRefs.current.forEach(li => {
      if (li.getAttribute('data-active') === 'true') {
        setActiveLeft(li.offsetLeft)
        setActiveWidth(li.clientWidth)
        setHoverLeft(li.offsetLeft)
        setHoverWidth(li.clientWidth)
      }
    })
  }, [])

  return (
    <>
      <NavStyles left={hoverLeft} width={hoverWidth}>
        <ul>
          {options.map((option: NavigationLink, i: number) => (
            <li
              key={option.slug.current}
              data-active={location.pathname === `/${option.slug.current}`}
              ref={(element: HTMLLIElement) => (liRefs.current[i] = element)}
            >
              <Link
                onMouseOver={handleHover}
                onMouseLeave={handleLeave}
                to={`/${option.slug.current}`}
              >
                {option.title}
              </Link>
            </li>
          ))}
        </ul>
        <span></span>
      </NavStyles>
    </>
  )
}

export default Nav
