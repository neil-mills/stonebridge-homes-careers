import React, { FC } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { HeadingLarge } from '../assets/styles/Typography'
import { SectionInner } from './Section'
import {
  SectionGutter,
  GutterPaddingLeft,
  GutterPaddingRight,
} from '../assets/styles/Utils'

interface ImageBannerProps {
  heading: string
  text: string
  src: string
  srcSet: string
  srcAlt?: string
  buttonLabel?: string
  buttonLink?: string
  alignText?: string
  top?: boolean
  tint?: boolean
}

interface Props {
  tint?: boolean
}

const ImageBannerStyles = styled.section<Props>`
  width: 100%;
  display: grid;
  position: relative;
  align-items: start;
  background-color: ${({ tint }) =>
    tint ? 'var(--light-grey)' : 'var(--white)'};
  height: auto;
  @media screen and (min-width: 768px) {
    ${GutterPaddingRight}
    ${GutterPaddingLeft}
    &:before {
      content: '';
      display: block;
      width: 100%;
      height: 29vw;
      max-height: 406px;
    }
    &[data-position='top'] {
      padding-bottom: 2vw;
      @media screen and (min-width: 1024px) {
        padding-bottom: 0;
      }
      &:before {
        height: 16vw;
        max-height: 208px;
      }
    }
  }
`

const InsetBox = styled.div`
  display: block;
  background-color: var(--green);
  width: 100%;
  ${SectionGutter}
  justify-self: end;
  [data-text-align='left'] & {
    justify-self: start;
  }
  z-index: 1;
  h3 {
    ${HeadingLarge}
    color: var(--gold);
    margin-top: 0;
  }
  p {
    color: var(--white);
    &:last-child {
      margin-bottom: 0;
    }
  }
  button {
    margin-top: 4.3vw;
  }
  @media screen and (min-width: 768px) {
    width: 50%;
    max-width: 592px;
    padding: 5.7vw;
  }
  @media screen and (min-width: 1400px) {
    padding: 8rem;
  }
`
const BgImage = styled.picture`
  img {
    object-fit: cover;
    object-position: center top;
    width: 100%;
    height: 100%;
  }
  position: relative;
  height: 320px;
  @media screen and (min-width: 768px) {
    position: absolute;
    top: 0;
    right: 0;
    bottom: calc(var(--gutter-h) * 1.5);
    left: 0;
    height: auto;
  }
  @media screen and (min-width: 1400px) {
    bottom: 11rem;
  }
`

const ImageBanner: FC<ImageBannerProps> = ({
  top = false,
  src,
  srcSet,
  srcAlt = '',
  heading,
  text,
  buttonLink,
  buttonLabel,
  alignText = 'right',
  tint = false,
}): JSX.Element => {
  console.log('Tint=', tint)
  return (
    <ImageBannerStyles
      tint={tint}
      data-position={top ? 'top' : 'page'}
      data-text-align={alignText}
    >
      <BgImage>
        <source media="(min-width: 500px)" srcSet={srcSet} />
        <img src={src} alt={srcAlt} />
      </BgImage>
      <SectionInner>
        <InsetBox>
          <h3>{heading}</h3>
          <p>{text}</p>
          {buttonLabel && buttonLink && (
            <Button label={buttonLabel} link={buttonLink} />
          )}
        </InsetBox>
      </SectionInner>
    </ImageBannerStyles>
  )
}

export default ImageBanner
