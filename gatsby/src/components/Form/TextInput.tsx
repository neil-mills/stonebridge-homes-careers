import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

interface Props {
  id: string
  value?: string
  type?: string
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  tabIndex?: number
  ariaDescribedBy?: string
  disabled?: boolean
}

export const StyledTextInput = styled.input`
  width: 100%;
  height: 40px;
  position: relative;
  display: block;
  border: 1px solid var(--keyline-grey);
  padding: 1rem;
  border-radius: 3px;
  font-family: effraregular;
  outline-color: var(--gold);
  background-color: var(--white);
  text-align: left;
  font-size: var(--font-xsmall);
  color: var(--grey);
  @media screen and (min-width: 768px) {
    height: 44px;
  }
`

export const TextInput = React.forwardRef<HTMLInputElement, Props>(
  (
    {
      type = 'text',
      minLength,
      maxLength,
      required = false,
      id,
      onChange,
      pattern,
      value = '',
      placeholder = '',
      tabIndex = 0,
      ariaDescribedBy = '',
      disabled = false,
    },
    ref
  ) => {
    return (
      <StyledTextInput
        ref={ref}
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        pattern={pattern}
        autoComplete={'off'}
        placeholder={placeholder}
        tabIndex={tabIndex}
        disabled={disabled}
        aria-describedby={ariaDescribedBy}
      />
    )
  }
)

TextInput.displayName = 'TextInput'
