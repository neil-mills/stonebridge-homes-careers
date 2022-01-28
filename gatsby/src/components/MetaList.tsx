import React, { FC } from 'react'
import styled from 'styled-components'
import AvatarIcon from '../assets/svg/icon-avatar.svg'

const StyledMetaList = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 1rem 0 0;
  ul {
    display: flex;
    justify-content: flex-start;
    font-size: var(--font-xsmall);
    line-height: 1;
  }
  li {
    padding: 0 1rem;
    position: relative;
    &:after {
      content: '';
      position: absolute;
      display: block;
      background-color: var(--grey);
      width: 1px;
      height: 100%;
      top: 0;
      right: 0;
      bottom: 0;
    }
    &:first-child {
      padding-left: 0;
    }
    &:last-child {
      padding-right: 0;
      &:after {
        display: none;
      }
    }
  }
  div {
    border-radius: 50%;
    background-color: var(--mid-grey);
    height: 6rem;
    width: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    overflow: hidden;
  }
  @media screen and (min-width: 1600px) {
    font-size: var(--font-base-desktop);
  }
`

interface MetaListProps {
  avatar?: string
  meta: string[]
  author?: boolean
}
const MetaList: FC<MetaListProps> = ({
  avatar,
  meta,
  author = false,
}): JSX.Element => {
  return (
    <StyledMetaList>
      {author && (
        <div>
          {author && avatar && <img src={avatar} />}
          {author && !avatar && <AvatarIcon />}
        </div>
      )}
      <ul>{meta.length && meta.map((value, i) => <li key={i}>{value}</li>)}</ul>
    </StyledMetaList>
  )
}

export default MetaList
