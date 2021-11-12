import React, { FC } from 'react'
import styled from 'styled-components'

const IconListItemStyles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  @media screen and (min-width: 768px) {
    padding: 0 4rem;
    text-align: center;
    padding: 0;
    display: grid;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      div:last-child {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`

const IconListItem: FC = ({ children }): JSX.Element => {
  return <IconListItemStyles>{children}</IconListItemStyles>
}

export default IconListItem
