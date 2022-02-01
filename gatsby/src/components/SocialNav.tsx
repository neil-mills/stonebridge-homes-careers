import React, { FC, useContext } from 'react'
import styled, { css } from 'styled-components'
import Instagram from '../assets/svg/instagram.svg'
import Facebook from '../assets/svg/facebook.svg'
import Linkedin from '../assets/svg/linkedin.svg'
import Twitter from '../assets/svg/twitter.svg'
import AppContext from '../context/AppContext'

interface SocialNavProps {
  color?: string
  tabIndex?: number
}

const SocialNavStyles = styled.nav<SocialNavProps>`
  ul {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 20px;
    align-items: top;
    gap: 2rem;
    ${({ color }) =>
      color === 'black' &&
      css`
        svg {
          path {
            fill: var(--black);
          }
        }
      `}
    @media screen and (min-width: 768px) {
      justify-content: right;
    }
  }
  a {
    display: block;
    height: 20px;
  }
`

const SocialNav: FC<SocialNavProps> = ({
  color = 'white',
  tabIndex,
}): JSX.Element => {
  const { instagram, facebook, linkedin, twitter } = useContext(AppContext)
  return (
    <SocialNavStyles color={color}>
      <ul>
        {instagram && (
          <li>
            <a
              href={instagram}
              target="_blank"
              tabIndex={tabIndex}
              rel="noreferrer"
            >
              <Instagram />
            </a>
          </li>
        )}
        {facebook && (
          <li>
            <a
              href={facebook}
              target="_blank"
              tabIndex={tabIndex}
              rel="noreferrer"
            >
              <Facebook />
            </a>
          </li>
        )}
        {linkedin && (
          <li>
            <a
              href={linkedin}
              target="_blank"
              tabIndex={tabIndex}
              rel="noreferrer"
            >
              <Linkedin />
            </a>
          </li>
        )}
        {twitter && (
          <li>
            <a
              href={twitter}
              target="_blank"
              tabIndex={tabIndex}
              rel="noreferrer"
            >
              <Twitter />
            </a>
          </li>
        )}
      </ul>
    </SocialNavStyles>
  )
}

export default SocialNav
