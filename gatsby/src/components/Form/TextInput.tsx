import React, { ChangeEvent, FC } from 'react'
import styled from 'styled-components'

interface Props {
  id: string
  value?: string
  type: string
  required?: boolean
  minLength?: number
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
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

export const TextInput: FC<Props> = ({
  type = 'text',
  minLength = 1,
  required = false,
  id,
  onChange,
}) => {
  return (
    <StyledTextInput
      type={type}
      name={id}
      id={id}
      onChange={onChange}
      minLength={minLength}
      required={required}
    />
  )
}

// export default TextInput
