import React, { useState, useEffect, useRef, FC } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { HeadingStyle, HeadingXLarge } from '../assets/styles/Typography'
import { GutterPaddingLeft, GutterPaddingRight } from '../assets/styles/Utils'
import { SectionInner } from './Section'
import { useLazyLoadImages } from '../hooks/useLazyLoadImages'

const BgGradient = styled.div`
  background-image: linear-gradient(
    90deg,
    rgba(0, 0, 0, 0.25) 0,
    transparent 60%
  );
  position: absolute;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  ${GutterPaddingLeft}
  ${GutterPaddingRight}
`
const HomeBannerInner = styled.div`
  width: 70%;
  @media screen and (min-width: 500px) {
    width: 55%;
  }
  @media screen and (min-width: 767px) {
    width: 43%;
  }
`
interface HomeBannerProps {
  title: string
  text: string
  btnLabel?: string
  btnLink?: string
  bgSrc: string
  bgSrcLg: string
  className?: string
}
const HomeBanner: FC<HomeBannerProps> = (props): JSX.Element => {
  const sectionRef = useRef<HTMLElement>(null)

  const [bgSrc, setBgSrc] = useState<string>('')
  const [isLoaded] = useLazyLoadImages({
    ref: sectionRef,
    src: [props.bgSrc, props.bgSrcLg],
    options: {
      threshold: 0,
      rootMargin: '0px',
    },
  })

  useEffect(() => {
    if (isLoaded && props.bgSrc && props.bgSrcLg) {
      handleResize()
    }
  }, [isLoaded])

  const handleResize = () => {
    setBgSrc(window.innerWidth < 500 ? props.bgSrc : props.bgSrcLg)
  }

  return (
    <section
      className={props.className}
      ref={sectionRef}
      style={{ backgroundImage: `url(${bgSrc})` }}
    >
      <BgGradient>
        <SectionInner>
          <HomeBannerInner>
            <h2>{props.title}</h2>
            <p>{props.text}</p>
            <Button label={'Find out more'} link={'/working-with-us'} />
          </HomeBannerInner>
        </SectionInner>
      </BgGradient>
    </section>
  )
}

const StyledHomeBanner = styled(HomeBanner)`
  background-color: var(--green);
  height: auto;
  ${GutterPaddingLeft}
  ${GutterPaddingRight}
    display: flex;
  align-items: center;
  justify-content: flex-start;
  background-position: right top;
  transition: background-position 200ms ease;
  background-size: cover;
  position: relative;
  height: auto;
  min-height: 35rem;
  @media screen and (min-width: 500px) and (max-width: 599px) {
    background-position: -100px top;
  }
  @media screen and (min-width: 600px) and (max-width: 699px) {
    background-position: -50px top;
  }
  @media screen and (min-width: 700px) and (max-width: 767px) {
    background-position: 20px top;
  }
  @media screen and (min-width: 500px) {
    padding-bottom: 3rem;
    min-height: 38rem;
  }
  @media screen and (min-width: 768px) {
    height: calc(60vw - 7.6rem);
    max-height: 60rem;
  }
  @media screen and (min-width: 1400px) {
    background-size: 1390px auto;
    background-position: right bottom;
    background-repeat: no-repeat;
    height: 68rem;
    max-height: 68rem;
  }
  h2 {
    ${HeadingStyle}
    ${HeadingXLarge}
    color: var(--white);
  }
  p {
    color: var(--gold);
    margin: 2rem 0 0;
    width: 85%;
    @media screen and (min-width: 500px) {
      width: 100%;
    }
  }
`

export default StyledHomeBanner
