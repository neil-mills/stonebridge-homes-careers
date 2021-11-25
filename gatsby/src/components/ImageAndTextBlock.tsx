import React, { Dispatch, SetStateAction } from 'react'
import styled from 'styled-components'
import PlayIcon from '../assets/svg/play.svg'
import { MarginBottomNone } from '../assets/styles/Utils'
import Button from './Button'
import { HeadingLarge } from '../assets/styles/Typography'
import Section from './Section'

const SectionStyles = styled.section`
  display: grid;
  gap: 2rem;
  @media screen and (min-width: 768px) {
    gap: 0;
  }
  grid-template-rows: repeat(auto, 2);
  align-items: center;
  h3 {
    ${HeadingLarge}
    margin-bottom: 2rem;
  }
  p {
    @media screen and (min-width: 768px) {
      padding-right: 2rem;
    }
    &:last-child {
      ${MarginBottomNone}
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
    aside {
      padding: 0 0 0 4vw;
    }
    &[data-text-align='left'] {
      aside {
        order: 1;
        padding: 0 4vw 0 0;
      }
    }
  }
`
const Picture = styled.picture`
  display: grid;
  align-items: center;
  width: 100%;
  img {
    grid-area: 1 / 1 / 1 / 1;
    object-fit: cover;
    width: 100%;
  }
  svg {
    grid-area: 1 / 1 / 1 / 1;
    z-index: 1;
    justify-self: center;
  }
  @media screen and (min-width: 768px) {
    [data-text-align='left'] & {
      order: 2;
    }
  }
`

interface ImageAndTextBlockProps {
  heading: string
  text: string
  alignText?: string
  src?: string
  srcSet?: string
  srcAlt?: string
  buttonLabel?: string
  buttonLink?: string
  videoSrc?: string
  buttonCallback?: () => void
  tint?: boolean
}
const ImageAndTextBlock = ({
  heading,
  text,
  alignText = 'left',
  src = '',
  srcSet = '',
  srcAlt = '',
  buttonLabel = '',
  buttonLink = '',
  videoSrc = '',
  buttonCallback,
  tint = false,
}: ImageAndTextBlockProps): JSX.Element => {
  return (
    <Section tint={tint}>
      <SectionStyles data-text-align={alignText}>
        {src && videoSrc && (
          <Picture>
            <source media="(min-width: 500px)" srcSet={srcSet} />
            <PlayIcon />
            <img src={src} alt={srcAlt} />
          </Picture>
        )}
        {src && !videoSrc && (
          <Picture>
            <source media="(min-width: 500px)" srcSet={srcSet} />
            <img src={src} />
          </Picture>
        )}
        <aside>
          <h3>{heading}</h3>
          <p>{text}</p>
          {buttonLabel && (
            <Button
              label={buttonLabel}
              link={buttonLink}
              callback={buttonCallback}
            />
          )}
        </aside>
      </SectionStyles>
    </Section>
  )
}

export default ImageAndTextBlock
