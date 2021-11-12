import React, { FC } from 'react'
import styled from 'styled-components'
import {
  HeadingStyle,
  FontMedium,
  HeadingLarge,
} from '../assets/styles/Typography'
import Button from './Button'
import CheckIcon from '../assets/svg/check.svg'

interface FormProps {
  method?: string
  action?: string
}
interface InputProps {
  name: string
  id: string
  value?: string
}
interface TextInputProps extends InputProps {
  type: string
}
interface CheckboxInputProps extends InputProps {
  checked: boolean
  label: string
  last: boolean
}
interface StyledCheckboxInputProps {
  checked: boolean
  last: boolean
}

const StyledInput = styled.input`
  width: 100%;
  height: 44px;
  position: relative;
  display: block;
  border: 1px solid var(--keyline-grey);
  padding: 1rem;
  background-color: var(--white);
  text-align: left;
  font-size: var(--font-xsmall);
  color: var(--grey);
`
const StyledForm = styled.form`
  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-auto-rows: auto;
    gap: 2rem;
  }
  legend {
    ${HeadingStyle}
    ${HeadingLarge}
  }
  label {
    font-size: var(--font-xsmall);
    display: block;
    color: var(--dark-grey);
    ${FontMedium}
  }
`
const StyledFileInput = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button,
  span {
    margin: 0;
  }
  span {
    padding-left: 2rem;
    font-size: var(--font-xsmall);
  }
  input {
    opacity: 0;
    z-index: 2;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }
`

const StyledCheckboxInput = styled.div<StyledCheckboxInputProps>`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  margin-top: ${({ last }) => (last ? '2rem' : '0')};
  input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    z-index: 2;
  }
  div {
    z-index: 1;
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--grey);
    background-color: ${({ checked }) =>
      checked ? 'var(--green)' : 'var(--white)'};
  }
  svg {
    opacity: ${({ checked }) => (checked ? 1 : 0)};
  }
  label {
    padding-left: 1rem;
  }
`

export const FileInput: FC<InputProps> = props => {
  return (
    <StyledFileInput>
      <input type="file" {...props} />
      <Button secondary={true} label={'Choose file'} link={'/'} />
      <span>No file chosen</span>
    </StyledFileInput>
  )
}
export const TextInput: FC<TextInputProps> = props => {
  return <StyledInput {...props} />
}

export const CheckboxInput: FC<CheckboxInputProps> = props => {
  return (
    <StyledCheckboxInput checked={props.checked} last={props.last}>
      <input type="checkbox" {...props} checked={props.checked} />
      <div>
        <CheckIcon />
      </div>
      <label htmlFor={props.id}>{props.label}</label>
    </StyledCheckboxInput>
  )
}

const Form: FC<FormProps> = ({ method, action, children }) => {
  return (
    <StyledForm method={method} action={action}>
      {children}
    </StyledForm>
  )
}

Form.defaultProps = {
  method: 'post',
  action: '',
}

CheckboxInput.defaultProps = {
  checked: false,
  last: false,
}
export default Form
