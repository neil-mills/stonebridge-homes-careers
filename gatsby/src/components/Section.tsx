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
}

export const SectionInner = styled.div`
  display: block;
  position: relative;
  width: 100%;
  @media screen and (min-width: 1600px) {
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

const Section: FC<SectionProps> = ({
  tint = false,
  marginTop = true,
  marginBottom = true,
  as = 'section',
  children,
  className,
}): JSX.Element => {
  return (
    <SectionStyled
      marginTop={marginTop}
      marginBottom={marginBottom}
      tint={tint}
      as={as}
      className={className}
    >
      <SectionInner>{children}</SectionInner>
    </SectionStyled>
  )
}

export default Section
