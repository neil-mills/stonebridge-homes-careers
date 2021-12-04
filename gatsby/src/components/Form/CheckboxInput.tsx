import React, { FC, useEffect, useState, ChangeEvent } from 'react'
import styled from 'styled-components'
import CheckIcon from '../../assets/svg/check.svg'

interface Props {
  id: string
  value?: string
  label: string
  className?: string
  callback: (e: ChangeEvent<HTMLInputElement>) => void
  required?: boolean
}

const StyledCheckboxInput = styled.div`
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2rem;
  &:last-child {
    margin-top: 0;
  }
  input {
    opacity: 0;
    position: absolute;
    left: 0;
    top: 0;
    width: 18px;
    height: 18px;
    z-index: 2;
    & + div {
      z-index: 1;
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      border: 1px solid var(--grey);
      background-color: var(--white);
      svg {
        opacity: 0;
      }
    }
    &[checked] {
      & + div {
        background-color: var(--green);
        svg {
          opacity: 1;
        }
      }
    }
  }
  label {
    padding-left: 1rem;
  }
`

export const CheckboxInput: FC<Props> = props => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    props.callback(e)
  }

  return (
    <StyledCheckboxInput className={props.className}>
      <input
        id={props.id}
        name={props.id}
        type="checkbox"
        value={props.value}
        defaultChecked={props.value === 'true'}
        onChange={handleChange}
        required={props.required}
      />
      <div>
        <CheckIcon />
      </div>
      <label htmlFor={props.id}>{props.label}</label>
    </StyledCheckboxInput>
  )
}
