import { createGlobalStyle, css } from 'styled-components'

import EffraRegular from '../fonts/effra_std_rg-webfont.woff'
import EffraMedium from '../fonts/effra_medium-webfont.woff'
import EffraBold from '../fonts/effra_std_bd-webfont.woff'

export const HeadingStyle = css`
  font-family: efframedium;
  font-weight: 400;
  color: var(--green);
  text-transform: uppercase;
  line-height: 1;
`
export const HeadingXLarge = css`
  font-size: var(--font-xlarge);
  line-height: 1;
  margin-bottom: 3rem;
  @media screen and (min-width: 500px) {
    font-size: var(--font-xlarge);
    font-size: clamp(var(--font-xlarge), 4.6vw, var(--font-xlarge-desktop));
  }
  @media screen and (min-width: 1600px) {
    font-size: var(--font-xlarge-desktop);
    margin-bottom: 4rem;
  }
`

export const HeadingLarger = css`
  font-size: var(--font-larger);
  margin-bottom: 2.5rem;
  line-height: 1.1;
  @media screen and (min-width: 768px) {
    font-size: var(--font-larger);
    font-size: clamp(var(--font-larger), 3.2vw, var(--font-larger-desktop));
  }
  @media screen and (min-width: 1600px) {
    font-size: var(--font-larger-desktop);
    margin-bottom: 4rem;
  }
`
export const HeadingLarge = css`
  font-size: var(--font-large);
  margin-bottom: 2rem;
  line-height: 1.1;
  span {
    color: var(--gold);
    font-size: (--font-small);
    display: block;
  }
  @media screen and (min-width: 768px) {
    margin-bottom: 3.2rem;
    font-size: var(--font-large);
    font-size: clamp(var(--font-large), 2.5vw, var(--font-large-desktop));
  }
  @media screen and (min-width: 1600px) {
    font-size: var(--font-large-desktop);
    /* margin-bottom: 3.2rem; */
  }
`
export const HeadingMedium = css`
  font-size: var(--font-medium);
  line-height: 1.1;
  /* margin-bottom: 2rem; */
  margin: 2rem 0;
  &:first-child {
    margin-top: 0;
  }
  @media screen and (min-width: 768px) {
    margin: 4rem 0;
    /* margin-bottom: 4rem; */
    font-size: var(--font-medium-desktop);
    font-size: clamp(var(--font-medium), 1.7vw, var(--font-medium-desktop));
  }
  @media screen and (min-width: 1600px) {
    /* margin-bottom: 4rem; */
    font-size: var(--font-medium-desktop);
  }
`

export const HeadingMediumKeyline = css`
  ${HeadingMedium}
  padding-top: 3rem;
  border-top: 1px solid var(--keyline-grey);
  @media screen and (min-width: 768px) {
    padding-top: 4rem;
  }
`

export const FontRegular = css`
  font-family: effraregular;
  font-weight: 400;
`
export const FontMedium = css`
  font-family: efframedium;
  font-weight: 400;
`
export const FontBold = css`
  font-family: effrabold;
  font-weight: 400;
`

export const BulletItem = css`
  padding-left: 1.5rem;
  position: relative;
  &:before {
    content: '•';
    position: absolute;
    left: 0;
    top: 0;
    color: var(--gold);
  }
`

const Typography = createGlobalStyle`
  
  html {
    font-family: effraregular, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  h1,h2,h3,h4 {
    ${HeadingStyle}
    margin-bottom: 2rem;
  }
  h1 {
    ${HeadingLarger}
  }
  h2 {
    ${HeadingLarge}
  }
  h3 {
    ${HeadingMedium}
  }
  p {
    margin: 2rem 0;
    @media screen and (min-width: 768px) {
      margin: 2rem 0;
    }
    &:empty {
      display: none;
    }
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
    &.bullet {
      ${BulletItem}
    }
    &.bold {
      ${FontBold}
    }
    a {
      color: var(--gold);
    &:link {
      color: var(--gold);
      border-bottom: 1px dotted var(--gold);
      text-decoration: none;
    }
    &:hover {
      border-bottom: 1px solid var(--gold);
    }
  }
  }
  
`

export default Typography
