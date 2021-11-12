import React, { MouseEvent } from 'react'
import styled from 'styled-components'
import { navigate } from 'gatsby'
import { FontBold } from '../assets/styles/Typography'

interface Props {
  secondary?: boolean
}
const ButtonStyles = styled.button<Props>`
  ${FontBold}
  display: block;
  margin-top: 4rem;
  @media screen and (min-width: 768px) {
    margin-top: 4.3vw;
  }
  border: ${props => (props.secondary ? '1px solid var(--green)' : 'none')};
  background-color: ${props =>
    props.secondary ? 'transparent' : 'var(--gold)'};
  color: ${props => (props.secondary ? 'var(--green)' : 'var(--white)')};
  font-size: var(--font-xsmall);
  text-transform: uppercase;
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

interface ButtonProps {
  label: string
  link: string
  secondary?: boolean
}

const Button = ({
  label,
  link,
  secondary = false,
}: ButtonProps): JSX.Element => {
  const handleClick = (e: MouseEvent) => {
    e.preventDefault()
    navigate(link)
  }

  return (
    <ButtonStyles secondary={secondary} onClick={handleClick}>
      {label}
    </ButtonStyles>
  )
}

export default Button
