import { css } from 'styled-components'

export const MarginBottomNone = css`
  margin-bottom: 0;
`

export const WhiteHover = css`
  color: var(--white);
  transition: color 500ms ease;
  svg path {
    color: var(--white);
    transition: fill 500ms ease;
  }
  &:link,
  &:visited {
    color: var(--white);
  }
  &:hover,
  &:active,
  &:focus {
    color: var(--white-hover);
    svg path {
      fill: var(--white-hover);
    }
  }
`

export const GoldLink = css`
  color: var(--gold);
  transition: color 500ms ease;
  &:link,
  &:visited {
    color: var(--gold);
  }
  &:hover,
  &:active,
  &:focus {
    color: var(--gold-hover);
    svg path {
      fill: var(--gold-hover);
    }
  }
`

export const GutterPaddingTop = css`
  padding-top: 4rem;
  @media screen and (min-width: 768px) {
    padding-top: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    padding-top: 11rem;
  }
`
export const GutterPaddingRight = css`
  padding-right: 2rem;
  @media screen and (min-width: 768px) {
    padding-right: var(--gutter-h);
  }
  @media screen and (min-width: 1024px) {
    padding-right: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    padding-right: 11rem;
  }
`
export const GutterPaddingBottom = css`
  padding-bottom: 4rem;
  @media screen and (min-width: 768px) {
    padding-bottom: calc(var(--gutter-h) * 1.5);
  }

  @media screen and (min-width: 1400px) {
    padding-bottom: 11rem;
  }
`
export const GutterPaddingLeft = css`
  padding-left: 2rem;
  @media screen and (min-width: 768px) {
    padding-left: var(--gutter-h);
  }
  @media screen and (min-width: 1024px) {
    padding-left: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    padding-left: 11rem;
  }
`
export const GapMargin = css`
  gap: 2rem;
  @media screen and (min-width: 768px) {
    gap: var(--gutter-h);
  }
  @media screen and (min-width: 1024px) {
    gap: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    gap: 11rem;
  }
`

export const GutterMarginLeft = css`
  padding-left: 2rem;
  @media screen and (min-width: 768px) {
    padding-left: var(--gutter-h);
  }
  @media screen and (min-width: 1024px) {
    padding-left: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    padding-left: 11rem;
  }
`

export const GutterMarginTop = css`
  margin-bottom: 4rem;
  @media screen and (min-width: 768px) {
    margin-top: var(--gutter-h);
  }
  @media screen and (min-width: 1024px) {
    margin-top: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    margin-top: 11rem;
  }
`

export const GutterMarginBottom = css`
  margin-bottom: 4rem;
  @media screen and (min-width: 768px) {
    margin-bottom: calc(var(--gutter-h) * 1.5);
  }
  @media screen and (min-width: 1400px) {
    margin-bottom: 11rem;
  }
`

export const SectionGutter = css`
  ${GutterPaddingTop}
  ${GutterPaddingRight}
  ${GutterPaddingBottom}
  ${GutterPaddingLeft}
`

export const ScrollableArea = css`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    display: none;
  }
  --ms-overflow-style: none;
  scrollbar-width: none;
`

export const VisiblyHidden = css`
  display: none;
`
export const VerticalSpacingTop = css`
  margin-top: 3rem;
  @media screen and (min-width: 768px) {
    margin-top: 4rem;
  }
`
export const VerticalSpacingBottom = css`
  margin-bottom: 3rem;
  @media screen and (min-width: 768px) {
    margin-bottom: 4rem;
  }
`
