import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import Instagram from '../assets/svg/instagram.svg'
import Facebook from '../assets/svg/facebook.svg'
import Linkedin from '../assets/svg/linkedin.svg'
import Twitter from '../assets/svg/twitter.svg'

interface SocialNavProps {
  color?: string
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

const SocialNav: FC<SocialNavProps> = ({ color = 'white' }): JSX.Element => {
  return (
    <SocialNavStyles color={color}>
      <ul>
        <li>
          <a href="">
            <Instagram />
          </a>
        </li>
        <li>
          <a href="">
            <Facebook />
          </a>
        </li>
        <li>
          <a href="">
            <Linkedin />
          </a>
        </li>
        <li>
          <a href="">
            <Twitter />
          </a>
        </li>
      </ul>
    </SocialNavStyles>
  )
}

export default SocialNav
