import React, { FC } from 'react'
import ArrowIcon from '../assets/svg/select-arrow.svg'
import styled, { css } from 'styled-components'
import { HeadingStyle } from '../assets/styles/Typography'
import { StyledInput } from './Form'

const SelectStyles = styled.div<SelectProps>`
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
interface SelectProps {
  label?: string
  size?: string
}
const Select: FC<SelectProps> = ({ label, size = 'lg' }): JSX.Element => {
  return (
    <SelectStyles size={size}>
      <p id="location">{label}</p>
      <StyledInput as={'button'} type="button" aria-labelledby="location">
        <span>{label}: Leeds</span>
        <ArrowIcon />
      </StyledInput>
      <select>
        <option>Leeds</option>
        <option>Manchester</option>
      </select>
    </SelectStyles>
  )
}

export default Select
