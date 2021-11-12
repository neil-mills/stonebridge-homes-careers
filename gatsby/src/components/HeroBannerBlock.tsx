import React, { FC } from 'react'
import styled from 'styled-components'
import { heroBanner } from '../types/heroBanner'

const HeroBanner = styled.div`
  display: grid;
`
const TextBlockStyles = styled.div`
  display: block;
`

const HeroBannerBlock: FC<heroBanner> = ({ heading, text, textBox }) => {
  const textBlock = textBox ? (
    <TextBlockStyles>
      <h2>{heading}</h2>
      <p>{text}</p>
    </TextBlockStyles>
  ) : (
    <>
      <h2>{heading}</h2>
      <p>{text}</p>
    </>
  )

  return <HeroBanner>{textBlock}</HeroBanner>
}

export default HeroBannerBlock
