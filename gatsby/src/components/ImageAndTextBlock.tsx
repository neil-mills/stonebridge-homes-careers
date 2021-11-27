import React from 'react'
import styled from 'styled-components'
import PlayIcon from '../assets/svg/play.svg'
import { MarginBottomNone } from '../assets/styles/Utils'
import Button from './Button'
import { HeadingLarge } from '../assets/styles/Typography'
import Section from './Section'
import { ImageAndTextBlockType } from '../types'

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

const ImageAndTextBlock = ({
  heading,
  sectionText,
  alignText = 'left',
  src,
  srcAlt = '',
  buttonLabel = '',
  buttonLink = '',
  videoSrc = '',
  buttonCallback,
  tint = false,
}: ImageAndTextBlockType): JSX.Element => {
  return (
    <Section tint={tint}>
      <SectionStyles data-text-align={alignText}>
        {src && videoSrc && (
          <Picture>
            <source
              media="(min-width: 500px)"
              srcSet={src.asset.fluid.srcSet}
            />
            <PlayIcon />
            <img src={src.asset.fluid.src} alt={srcAlt} />
          </Picture>
        )}
        {src && !videoSrc && (
          <Picture>
            <source
              media="(min-width: 500px)"
              srcSet={src.asset.fluid.srcSet}
            />
            <img src={src.asset.fluid.src} />
          </Picture>
        )}
        <aside>
          <h3>{heading}</h3>
          <p>{sectionText}</p>
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
