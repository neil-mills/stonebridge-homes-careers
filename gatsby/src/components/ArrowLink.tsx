import React, { FC, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { Link } from 'gatsby'
import { VisiblyHidden } from '../assets/styles/Utils'
import ArrowIcon from '../assets/svg/arrow-icon.svg'
import CloseIcon from '../assets/svg/close.svg'

interface ArrowLinkProps {
  direction?: string
  color?: string
  link?: string
  callback?: () => void
  label: string
  visibleLabel?: boolean
  isClose?: boolean
  tabIndex?: number
  isFocussed?: boolean
}
interface LinkWrapperProps {
  link?: string
  callback?: () => void
  tabIndex?: number
  children: React.ReactElement[]
  isFocussed?: boolean
}

const StyledCloseIcon = styled(CloseIcon)`
  width: 10px;
  height: 10px;
`

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
  button {
    border: none;
    background-color: transparent;
  }
  a,
  button {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: all 200ms ease;
    color: ${({ color }) => (color === 'gold' ? 'var(--gold)' : 'var(--grey)')};
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
            padding-left: 0.5rem;
          `
        : css`
            order: 0;
            padding-right: 0.5rem;
          `};
  }
`

const LinkWrapper: FC<LinkWrapperProps> = ({
  link,
  callback,
  children,
  tabIndex = 0,
  isFocussed = false,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (isFocussed && buttonRef.current) buttonRef.current.focus()
  }, [isFocussed])

  return (
    <>
      {callback && (
        <button
          tabIndex={tabIndex}
          onClick={() => callback()}
          onBlur={() => callback()}
          ref={buttonRef}
        >
          {children.map((child: React.ReactElement) => child)}
        </button>
      )}
      {link && (
        <Link to={link} tabIndex={tabIndex}>
          {children.map((child: React.ReactElement) => child)}
        </Link>
      )}
      {!link && !callback && (
        <>{children.map((child: React.ReactElement) => child)}</>
      )}
    </>
  )
}

const ArrowLink: FC<ArrowLinkProps> = ({ ...props }) => {
  return (
    <ArrowStyles {...props} tabIndex={-1}>
      <LinkWrapper
        link={props.link}
        callback={props.callback}
        tabIndex={props.tabIndex || 0}
        isFocussed={props.isFocussed}
      >
        <span tabIndex={-1}>{props.label}</span>
        {!props.isClose ? <ArrowIcon /> : <StyledCloseIcon />}
      </LinkWrapper>
    </ArrowStyles>
  )
}

ArrowLink.defaultProps = {
  visibleLabel: true,
}
export default ArrowLink
