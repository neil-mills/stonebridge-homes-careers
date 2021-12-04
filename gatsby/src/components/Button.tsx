import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { FontBold } from '../assets/styles/Typography'

interface Props {
  secondary?: boolean
}

interface ButtonProps {
  label: string
  link?: string
  type?: 'button' | 'submit'
  callback?: (e: MouseEvent) => void
  secondary?: boolean
  className?: string
  disabled?: boolean
}

const StyledButton = styled.button<Props>`
  ${FontBold}
  display: block;
  margin-top: 3rem;
  @media screen and (min-width: 768px) {
    margin-top: 4.3vw;
  }
  border: ${props => (props.secondary ? '1px solid var(--green)' : 'none')};
  background-color: ${props =>
    props.secondary ? 'transparent' : 'var(--gold)'};
  color: ${props => (props.secondary ? 'var(--green)' : 'var(--white)')};
  font-size: var(--font-xsmall);
  text-transform: uppercase;
  border-radius: 3px;
  padding: 1.2rem 1.6rem;
  text-align: center;
  transition: background-color 200ms ease;
  will-change: background-color;
  outline: none;
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    background-color: ${props =>
      props.secondary ? 'transparent' : 'var(--gold-hover)'};
  }
`

const Button = ({
  label,
  link,
  type = 'button',
  callback,
  secondary = false,
  className = '',
  disabled = false,
}: ButtonProps): JSX.Element => {
  const handleClick = (e: MouseEvent) => {
    if (callback) {
      callback(e)
    }
    if (link) {
      navigate(link)
    }
  }

  return (
    <StyledButton
      className={className}
      type={type}
      secondary={secondary}
      onClick={handleClick}
      disabled={disabled}
    >
      {label}
    </StyledButton>
  )
}

StyledButton.defaultProps = {
  type: 'button',
}
export default Button
