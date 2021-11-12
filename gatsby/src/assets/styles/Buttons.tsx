import { css } from 'styled-components'
import { FontMedium } from './Typography'

export const SecondaryButton = css`
  border: 1px solid var(--green);
  outline: none;
  display: block;
  line-height: 3.2rem;
  height: 3.2rem;
  font-size: var(--font-xsmall);
  ${FontMedium}
  background-color: transparent;
  transform: all 200ms ease;
  will-change: color, background-color;
  color: var(--green);
  cursor: pointer;
  padding: 0 1.5rem;
  &:visited {
    color: var(--green);
  }
  &:hover,
  &:active,
  &[aria-current='true'] {
    color: var(--white);
    background-color: var(--green);
  }
`
