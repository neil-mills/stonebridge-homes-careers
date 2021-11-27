import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import ArrowIcon from '../assets/svg/select-arrow.svg'
import styled, { css } from 'styled-components'
import { HeadingStyle } from '../assets/styles/Typography'
import { StyledInput } from './Form'

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
      padding-top: 3px;
    }
  }
  select {
    background-color: transparent;
    border: none;
    z-index: 4;
    width: 100%;
    display: block;
    position: absolute;
    outline: none;
    top: 0;
    left: 0;
    bottom: 0;
    height: 40px;
    color: transparent;
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
  options: Option[]
  value?: string
  callback?: (value: { [key: string]: string }) => void
}

const Select: FC<SelectProps> = ({
  label,
  name = '',
  size = 'lg',
  disabled = false,
  options = [],
  value = '',
  callback,
}): JSX.Element => {
  const [selectedValue, setSelectedValue] = useState(value)
  const [selectLabel, setSelectLabel] = useState(label)

  useEffect(() => {
    setSelectLabel(`${label}${selectedValue && `: ${selectedValue}`}`)
    if (callback) callback({ [name]: selectedValue })
  }, [selectedValue])

  return (
    <SelectStyles size={size}>
      <p id="location">{label}</p>
      <StyledInput as={'button'} type="button" aria-labelledby="location">
        <span>{selectLabel}</span>
        <ArrowIcon />
      </StyledInput>
      <select
        onChange={(e: ChangeEvent<HTMLSelectElement>) =>
          setSelectedValue(e.target.value)
        }
        name={name}
        disabled={disabled}
        value={selectedValue}
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

export default Select
