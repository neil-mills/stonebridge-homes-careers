import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { VisiblyHidden } from '../assets/styles/Utils'
import ArrowIcon from '../assets/svg/arrow-icon.svg'

interface ArrowLinkProps {
  direction?: string
  color?: string
  link?: string
  label: string
  visibleLabel?: boolean
}
interface LinkWrapperProps {
  link?: string
  children: React.ReactElement[]
}

const ArrowStyles = styled.div<ArrowLinkProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: var(--font-xsmall);
  svg {
    transform-origin: 50% 50%;
    order: ${({ direction }) => (direction === 'left' ? 0 : 1)};
    path {
      transition: fill 200ms ease;
      fill: ${({ color }) =>
        color === 'gold' ? 'var(--gold)' : 'var(--grey)'};
    }
    ${({ direction }) =>
      direction === 'left' &&
      css`
        transform: rotate(-180deg);
      `};
    ${({ direction }) =>
      direction === 'up' &&
      css`
        transform: rotate(-90deg);
      `};
    ${({ direction }) =>
      direction === 'down' &&
      css`
        transform: rotate(90deg);
      `};
  }
  color: ${({ color }) => (color === 'gold' ? 'var(--gold)' : 'var(--grey)')};
  a {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: all 200ms ease;
    &:link,
    &:visited {
      color: ${({ color }) =>
        color === 'gold' ? 'var(--gold)' : 'var(--grey)'};
    }
    &:hover,
    &:focus,
    &:active {
      color: ${({ color }) =>
        color === 'gold' ? 'var(--gold-hover)' : 'var(--black)'};
      svg {
        path {
          fill: ${({ color }) =>
            color === 'gold' ? 'var(--gold-hover)' : 'var(--black)'};
        }
      }
    }
  }
  span {
    display: block;
    ${({ visibleLabel }) => !visibleLabel && VisiblyHidden};
    ${({ direction, visibleLabel }) =>
      direction === 'left' && visibleLabel
        ? css`
            order: 1;
            padding-left: 1rem;
          `
        : css`
            order: 0;
            padding-right: 1rem;
          `};
  }
`

const LinkWrapper: FC<LinkWrapperProps> = ({ link, children }) => {
  return (
    <>
      {link ? (
        <Link to={link}>
          {children.map((child: React.ReactElement) => child)}
        </Link>
      ) : (
        <>{children.map((child: React.ReactElement) => child)}</>
      )}
    </>
  )
}

const ArrowLink: FC<ArrowLinkProps> = ({ ...props }) => {
  return (
    <ArrowStyles {...props}>
      <LinkWrapper link={props.link}>
        <span>{props.label}</span>
        <ArrowIcon />
      </LinkWrapper>
    </ArrowStyles>
  )
}

ArrowLink.defaultProps = {
  visibleLabel: true,
}
export default ArrowLink
