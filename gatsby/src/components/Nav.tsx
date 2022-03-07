import React, {
  FC,
  MouseEvent,
  useState,
  useEffect,
  useRef,
  useContext,
} from 'react'
import { Link } from 'gatsby'
import styled, { css } from 'styled-components'
import { FontBold } from '../assets/styles/Typography'
import MenuButton from './MenuButton'
import { NavigationLink } from '../types/navigation'
import AppContext from '../context/AppContext'

const NavStyles = styled.nav<{
  left: number
  width: number
  animateWidth: boolean
  activePage: boolean
}>`
  display: none;
  height: 100%;
  position: relative;
  @media screen and (min-width: 768px) {
    display: block;
  }
  ul {
    display: grid;
    grid-auto-flow: column;
    grid-gap: 4rem;
    height: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  li {
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
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
    opacity: ${({ activePage }) => (activePage ? 1 : 0)};
    height: 3px;
    ${({ left, width }) => css`
      left: ${left}px;
      width: ${width}px;
    `}
    background-color: var(--gold);
    position: absolute;
    bottom: 0;
    transition: ${({ animateWidth }) =>
      animateWidth
        ? 'left 200ms ease, width 200ms ease, opacity 200ms ease'
        : 'left 200ms ease, opacity 200ms ease'};
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
  const [animateWidth, setAnimateWidth] = useState(false)
  const [showLine, setShowLine] = useState(false)
  const liRefs = useRef<HTMLLIElement[]>([])
  let delay: ReturnType<typeof setTimeout> | null = null
  const { setActivePage, activePage, pageTabIndex } = useContext(AppContext)

  const HandleClick = (e: MouseEvent) => {
    if (setActivePage) {
      setActivePage(true)
    }
    if (delay) clearTimeout(delay)
    if ((e.target as HTMLAnchorElement).parentElement) {
      const parent = (e.target as HTMLAnchorElement).parentElement
      if (parent) {
        const width: number = parent.clientWidth
        const left = parent.offsetLeft
        setActiveLeft(left)
        setActiveWidth(width)
      }
    }
  }
  const handleHover = (e: MouseEvent) => {
    if (delay) clearTimeout(delay)
    setShowLine(true)
    setAnimateWidth(true)
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
      if (activePage) {
        setHoverWidth(activeWidth)
        setHoverLeft(activeLeft)
      } else {
        setShowLine(false)
      }
    }, 500)
  }

  useEffect(() => {
    setShowLine(activePage)
  }, [activePage])

  useEffect(() => {
    setShowLine(activePage)
    liRefs.current.forEach(li => {
      if (li.getAttribute('data-active') === 'true') {
        setTimeout(() => {
          setActiveLeft(li.offsetLeft)
          setActiveWidth(li.clientWidth)
          setHoverLeft(li.offsetLeft)
          setHoverWidth(li.clientWidth)
        }, 1000)
      }
    })
  }, [])
  if (typeof window === 'undefined') {
    return
  }
  return (
    <>
      <MenuButton />
      <NavStyles
        left={hoverLeft}
        width={hoverWidth}
        animateWidth={animateWidth}
        activePage={showLine}
      >
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
                onClick={HandleClick}
                tabIndex={pageTabIndex}
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
