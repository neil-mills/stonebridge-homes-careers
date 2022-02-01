import React, { useState, useEffect, ChangeEvent } from 'react'
import ArrowIcon from '../../assets/svg/select-arrow.svg'
import styled, { css } from 'styled-components'
import { HeadingStyle } from '../../assets/styles/Typography'
import { StyledTextInput } from './TextInput'

const SelectStyles = styled.div<{ size: string }>`
  display: block;
  ${({ size }) =>
    size === 'sm'
      ? css`
          width: 50%;
          @media screen and (min-width: 768px) {
            width: 33%;
          }
        `
      : css`
          width: 100%;
        `};
  height: 44px;
  position: relative;
  p {
    display: none;
  }
  button {
    width: 100%;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: left;
    ${HeadingStyle}
    span {
      display: block;
      color: var(--grey);
      font-family: effraregular;
      text-transform: capitalize;
    }
  }
  select {
    background-color: transparent;
    border: none;
    z-index: 4;
    width: 100%;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    height: 40px;
    color: transparent;
    outline-color: var(--gold);
    -webkit-appearance: none;
    option {
      color: var(--grey);
    }
    @media screen and (min-width: 768px) {
      height: 44px;
    }
  }
`
interface Option {
  label: string
  value: string
}
interface SelectProps {
  label?: string
  name: string
  size?: string
  disabled?: boolean
  required?: boolean
  options: Option[]
  value?: string
  tabIndex?: number
  callback: (e: ChangeEvent<HTMLSelectElement>) => void
}
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      name = '',
      size = 'lg',
      disabled = false,
      required = false,
      options = [],
      value = '',
      callback,
      tabIndex = 0,
    },
    ref
  ) => {
    const [selectLabel, setSelectLabel] = useState(label || '')

    useEffect(() => {
      setSelectLabel(label ? `${label}${value && `: ${value}`}` : value)
    }, [value])

    return (
      <SelectStyles size={size} tabIndex={-1}>
        <p id="location">{label}</p>
        <StyledTextInput
          as={'button'}
          type="button"
          tabIndex={-1}
          aria-labelledby="location"
        >
          <span>{selectLabel}</span>
          <ArrowIcon />
        </StyledTextInput>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => callback(e)}
          name={name}
          id={name}
          disabled={disabled}
          required={required}
          value={value}
          ref={ref}
          tabIndex={tabIndex}
        >
          <option value={''}>{label}</option>
          {options.map((option: Option, i: number) => (
            <option key={i} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </SelectStyles>
    )
  }
)

Select.displayName = 'Select'
