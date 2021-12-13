import React, { FC, ReactNode } from 'react'
import styled from 'styled-components'

interface Props {
  columns?: number
  spaced?: boolean
}
const GridStyles = styled.ul<Props>`
  display: flex;
  flex-wrap: wrap;
  overflow-x: hidden;
`
const ItemStyles = styled.li`
  padding: 4rem 0;
  border: 1px solid var(--keyline-grey);
  border-width: 0 0 1px;
  &:last-child {
    border-width: 0;
    padding-bottom: 0;
  }
  @media screen and (min-width: 768px) {
    padding: 4vw 0 4vw 6vw;
    border-width: 1px 0 0 0;
    &:last-child {
      border-width: 1px 0 0;
    }
    [data-columns='2'] & {
      width: calc(100% / 2);
      padding: 0;
      border-width: 1px 1px 0 0;
      &:nth-child(-n + 2) {
        border-width: 0 1px 0 0;
      }
      &:nth-child(2n) {
        border-right: 0;
      }
    }
    [data-columns='4'] & {
        & > div {
          height: 100%;
          padding-right: 6vw;
          border-right: 1px solid var(--keyline-grey);
        }
        margin: 0 0 0 -6vw;
        width: calc(100% / 2 + 6vw);
        &:nth-child(-n + 2) {
          border-width: 0;
        }
        &:first-child {
          padding-top: 4vw;
        }
        &:nth-child(2n) {
          margin: 0 -6vw 0 0;
          padding-right: 0;
          & > div {
            border: none;
          }
        }
        &:last-child {
          padding-bottom: 4vw;
          & > div {
            border: none;
          }
        }
      }
    }
    [data-columns='3'] & {
      width: calc(100% / 2);
      padding: 0;
      border-width: 0 1px 1px 0;
      &:nth-last-child(-n + 2) {
        border-width: 0 1px 0 0;
      }
      &:nth-child(2n) {
        border-width: 0 0 1px 0;
      }
    }
  }
  @media screen and (min-width: 1024px) {
    [data-columns='3'] & {
      width: calc(100% / 3);
      &:nth-child(2n) {
        border-right: 1px solid var(--keyline-grey);
      }
      &:nth-child(3n) {
        border-right: 0;
      }
      &:nth-last-child(-n + 3) {
        border-width: 0 1px 0 0;
      }
    }
  }
`
export const KeylineGridItem: FC = ({ children }): JSX.Element => {
  return <ItemStyles>{children}</ItemStyles>
}

interface KeylineGridProps {
  columns?: number
  children: ReactNode
}

const KeylineGrid: FC<KeylineGridProps> = ({
  columns = 2,
  children,
}): JSX.Element => {
  return <GridStyles data-columns={columns}>{children}</GridStyles>
}

export default KeylineGrid
