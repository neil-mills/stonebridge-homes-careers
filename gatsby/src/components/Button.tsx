import React, { MouseEvent, ReactNode } from 'react'
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
  callback?: ((e: MouseEvent) => void) | null
  secondary?: boolean
  className?: string
  disabled?: boolean
  icon?: ReactNode | null
  tabIndex: number
}

const StyledButton = styled.button<Props>`
  ${FontBold}
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
  margin-top: 3rem;
  @media screen and (min-width: 768px) {
    margin-top: 4rem;
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
  outline: 2px solid transparent;
  line-height: 2.5rem;
  cursor: pointer;
  &:hover,
  &:focus,
  &:active {
    background-color: ${props =>
      props.secondary ? 'transparent' : 'var(--gold-hover)'};
  }
  &:focus {
    outline: 2px solid var(--black);
  }
  svg {
    width: 2.5rem;
    height: 2.5rem;
  }
`
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const handleClick = (e: MouseEvent) => {
      if (props.callback) {
        props.callback(e)
      }
      if (!props.callback && props.link) {
        navigate(props.link)
      }
    }

    return (
      <StyledButton
        className={props.className}
        type={props.type}
        secondary={props.secondary}
        onClick={handleClick}
        disabled={props.disabled}
        tabIndex={props.tabIndex}
        ref={ref}
      >
        {props.label}
        {props.icon && props.icon}
      </StyledButton>
    )
  }
)

Button.displayName = 'CheckboxInput'
Button.defaultProps = {
  type: 'button',
}

export default Button
