import React, { FC } from 'react'
import styled from 'styled-components'
import { HeadingMedium, FontRegular } from '../assets/styles/Typography'

interface Props {
  icon: string
  subTitle?: string
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
    margin-top: 0;
    @media screen and (min-width: 768px) {
      margin: 0;
    }
    span {
      display: block;
      font-size: var(--font-small);
      margin-bottom: 4px;
      ${FontRegular}
    }
  }
  img {
    height: 40px;
    width: auto;
    margin-bottom: 2rem;
    display: inline-block;
  }
  @media screen and (min-width: 768px) {
    max-width: 215px;
    text-align: center;
  }
  @media screen and (min-width: 1024px) {
    max-width: 255px;
    text-align: center;
  }
  @media screen and (min-width: 1600px) {
    max-width: 270px;
  }
`

const IconTitle: FC<Props> = ({
  icon,
  title,
  subTitle = '',
  align = 'center',
}) => {
  return (
    <IconTitleStyles align={align}>
      <img src={icon} />
      <h3>
        {subTitle && <span>{subTitle}</span>}
        {title}
      </h3>
    </IconTitleStyles>
  )
}

export default IconTitle
