import React, { FC } from 'react'
import styled from 'styled-components'
import { HeadingLarge } from '../assets/styles/Typography'
import {
  GutterPaddingTop,
  GutterPaddingRight,
  GutterPaddingBottom,
  GutterPaddingLeft,
} from '../assets/styles/Utils'

interface SectionProps {
  tint?: boolean
  marginTop?: boolean
  marginBottom?: boolean
  as?: React.ElementType
  className?: string
  children: React.ReactNode
}

export const SectionInner = styled.div`
  display: block;
  position: relative;
  width: 100%;
  @media screen and (min-width: 1400px) {
    max-width: 1180px;
  }
  margin: 0 auto;
`

const SectionStyled = styled.section<SectionProps>`
  ${({ marginTop }) => marginTop && GutterPaddingTop}
  ${GutterPaddingRight}
  ${({ marginBottom }) => marginBottom && GutterPaddingBottom}
  ${GutterPaddingLeft}
  background-color: ${({ tint }) =>
    tint ? 'var(--light-grey)' : 'var(--white)'};
`

export type Ref = HTMLElement
const Section = React.forwardRef<Ref, SectionProps>((props, ref) => (
  <SectionStyled
    ref={ref}
    marginTop={props.marginTop}
    marginBottom={props.marginBottom}
    tint={props.tint}
    as={props.as}
    className={props.className}
  >
    <SectionInner>{props.children}</SectionInner>
  </SectionStyled>
))

Section.displayName = 'Section'
export default Section
