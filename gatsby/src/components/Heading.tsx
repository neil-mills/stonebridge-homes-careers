import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import {
  HeadingLarge,
  HeadingLarger,
  HeadingStyle,
} from '../assets/styles/Typography'

interface HeadingProps {
  subHeading?: string
  subHeadingDate?: boolean
  heading: string
  headingLarger?: boolean
  marginBottom?: boolean
  as?: React.ElementType
  text?: string
  level?: number
}

const HeadingStyles = styled.div<HeadingProps>`
  span,
  time {
    ${HeadingStyle}
    color: var(--gold);
    ${({ headingLarger }) =>
      headingLarger
        ? css`
            font-size: var(--font-small);
            @media screen and (min-width: 768px) {
              font-size: var(--font-medium);
            }
          `
        : css`
            font-size: var(--font-small);
          `};
    margin-bottom: 1rem;
    display: block;
    @media screen and (min-width: 768px) {
    }
  }
  h1,
  h2,
  h3 {
    ${({ headingLarger }) =>
      headingLarger
        ? css`
            ${HeadingLarger}
          `
        : css`
            ${HeadingLarge}
          `};
    ${({ marginBottom }) =>
      !marginBottom &&
      css`
        margin-bottom: 0;
        @media screen and (min-width: 768px) {
          margin-bottom: 0;
        }
      `};
    /* ${({ text }) => text && 'margin-bottom: 0;'}; */
  }
  p {
    @media screen and (min-width: 768px) {
      max-width: 70%;
    }
    ${({ headingLarger }) =>
      headingLarger &&
      css`
        font-size: var(--font-xsmall);
        @media screen and (min-width: 768px) {
          font-size: var(--font-base-desktop);
        }
      `};
    &:last-child {
      @media screen and (min-width: 768px) {
        margin-bottom: ${({ marginBottom }) => (!marginBottom ? '0' : '4rem')};
      }
    }
  }
`
interface HeadingElementProps {
  level: number
}
const HeadingElement: FC<HeadingElementProps> = ({
  level,
  children,
  ...props
}) => {
  return React.createElement(`h${level}`, props, children)
}

const Heading: FC<HeadingProps> = ({
  subHeading = '',
  subHeadingDate = false,
  marginBottom = true,
  headingLarger = false,
  heading,
  level = 2,
  text = '',
}): JSX.Element => {
  return (
    <HeadingStyles
      subHeading={subHeading}
      marginBottom={marginBottom}
      heading={heading}
      text={text}
      headingLarger={headingLarger}
    >
      {subHeading && (
        <>
          {!subHeadingDate ? (
            <span>{subHeading}</span>
          ) : (
            <time dateTime={subHeading}>{subHeading}</time>
          )}
        </>
      )}
      <HeadingElement level={level}>{heading}</HeadingElement>
      {text && <p>{text}</p>}
    </HeadingStyles>
  )
}

export default Heading
