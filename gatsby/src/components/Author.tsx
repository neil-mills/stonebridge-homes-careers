import React, { FC } from 'react'
import styled from 'styled-components'
import AvatarIcon from '../assets/svg/icon-avatar.svg'

const AuthorStyles = styled.div`
  font-size: var(--font-xsmall);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
  div {
    border-radius: 50%;
    background-color: var(--mid-grey);
    height: 4rem;
    width: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1rem;
    overflow: hidden;
  }
`
interface AuthorProps {
  avatar?: string
  label: string
}

const Author: FC<AuthorProps> = ({ avatar, label }) => {
  return (
    <AuthorStyles>
      <div>{avatar ? <img src={avatar} /> : <AvatarIcon />}</div>
      {label}
    </AuthorStyles>
  )
}

export default Author
