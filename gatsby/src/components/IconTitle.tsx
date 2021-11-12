import React, { FC } from 'react'
import styled from 'styled-components'
import { HeadingMedium } from '../assets/styles/Typography'

interface Props {
  icon: React.ReactNode
  title: string
  align?: string
}

interface StyleProps {
  align?: string
}
const IconTitleStyles = styled.div<StyleProps>`
  text-align: ${props => props.align};
  h3 {
    ${HeadingMedium}
    @media screen and (min-width: 768px) {
      margin-bottom: 0;
    }
  }
  svg {
    height: 40px;
    width: auto;
    margin-bottom: 2rem;
  }
  @media screen and (min-width: 768px) {
    max-width: 215px;
    text-align: center;
  }
  @media screen and (min-width: 1024px) {
    max-width: 255px;
    text-align: center;
  }
  @media screen and (min-width: 1400px) {
    max-width: 270px;
  }
`

const IconTitle: FC<Props> = ({ icon, title, align = 'center' }) => {
  return (
    <IconTitleStyles align={align}>
      {icon}
      <h3>{title}</h3>
    </IconTitleStyles>
  )
}

export default IconTitle
