import React, { FC } from 'react'
import ArrowIcon from '../assets/svg/select-arrow.svg'
import styled from 'styled-components'
import { HeadingStyle } from '../assets/styles/Typography'

const SelectStyles = styled.div<SelectProps>`
  display: block;
  width: ${({ size }) => (size === 'sm' ? '30%' : '100%')};
  height: 44px;
  position: relative;
  p {
    display: none;
  }
  button {
    width: 100%;
    height: 44px;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1px solid var(--keyline-grey);
    padding: 1rem;
    background-color: var(--white);
    text-align: left;
    ${HeadingStyle}
    font-size: var(--font-xsmall);
    color: var(--grey);
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
    height: auto;
    color: transparent;
    -webkit-appearance: none;
    option {
      color: var(--grey);
    }
  }
`
interface SelectProps {
  label?: string
  size?: string
}
const Select: FC<SelectProps> = ({ label, size = 'lg' }): JSX.Element => {
  return (
    <SelectStyles size={size}>
      <p id="location">{label}</p>
      <button type="button" aria-labelledby="location">
        <span>{label}: Leeds</span>
        <ArrowIcon />
      </button>
      <select>
        <option>Leeds</option>
        <option>Manchester</option>
      </select>
    </SelectStyles>
  )
}

export default Select
