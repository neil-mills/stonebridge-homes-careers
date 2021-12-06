import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  :root {
    --green: #00443F;
    --green-tint: #e6ecec;
    --gold: #BC9F5F;
    --gold-hover: #a38646;
    --grey: #666666;
    --light-grey: #F5F5F5;
    --mid-grey: #BFBFBF;
    --dark-grey: #262626;
    --keyline-grey: #E8E8E8;
    --white: #FFFFFF;
    --black: #000000;       
    --white-hover: #cccccc;
    --font-xlarge: 3rem;
    --font-xlarge-desktop: 6.5rem;
    --font-larger: 2.4rem;
    --font-larger-desktop: 4.6rem;
    --font-large: 2.4rem;
    --font-large-desktop: 3.5rem;
    --font-base: 1.6rem;
    --font-base-desktop: 2rem;
    --font-medium: 1.8rem;
    --font-medium-desktop: 2.2rem;
    --font-small: 1.6rem;
    --font-xsmall: 1.4rem;
    --gutter-v: 5vw;
    --gutter-h: 4vw;
  }
  html,
  body {
    overflow-x: hidden;
  }
  html {
    font-size: 10px;
    height: 100%;
    box-sizing: border-box;
    background-color: var(--green);
  }
  body {
    font-size: var(--font-base);
    @media screen and (min-width: 1400px) {
      font-size: var(--font-base-desktop);
    }
    line-height: 1.4;
    color: var(--grey);
    &[data-noscroll="true"] {
      overflow-y: hidden;  
    }
  }
  ul,
  li,
  img,
  h1,
  h2,
  h3,
  h4,
  figure {
    padding: 0;
    margin: 0;
  }
  p {
    margin: 1rem 0;
  }
  ul {
    list-style: none;
  }
  img {
    display: block;
    width: 100%;
    height: auto;
  }
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  } 
  a {
    text-decoration: none;
    outline: 3px solid transparent;
    display: block;
  }
  /* a, button {
    &:focus {
      outline: 3px solid var(--black);
    }
  } */
  * {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  main {
    background-color: var(--white);
    padding: 7.6rem 0 0;
    @media screen and (min-width: 768px) {
      padding: 7.6rem 0 0;
    }
  }
  address {
    font-style: normal;
    white-space: pre-wrap;
  }
`
export default GlobalStyles
