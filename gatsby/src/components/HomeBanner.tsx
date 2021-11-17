import React, { useState, useEffect, useRef, FC } from 'react'
import styled from 'styled-components'
import Button from './Button'
import { HeadingStyle, HeadingXLarge } from '../assets/styles/Typography'
import { GutterPaddingLeft, GutterPaddingRight } from '../assets/styles/Utils'
import { SectionInner } from './Section'

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
  const [loaded, setLoaded] = useState<number>(0)
  const [bgSrc, setBgSrc] = useState<string>('')
  const sectionRef = useRef<HTMLElement>(null)

  const sources = [props.bgSrc, props.bgSrcLg]

  const preloadImages = () => {
    sources.forEach(src => {
      const img = new Image()
      img.src = src
      img.onload = () => {
        setLoaded(prevState => (prevState += 1))
      }
    })
  }

  const handleResize = () => {
    setBgSrc(window.innerWidth < 500 ? props.bgSrc : props.bgSrcLg)
  }

  useEffect(() => {
    if (loaded === 0) {
      preloadImages()
    }
    if (loaded === sources.length && sectionRef.current) {
      handleResize()
      window.addEventListener('resize', handleResize)
      sectionRef.current.style.opacity = '1'
    }
    if (bgSrc && sectionRef.current) {
      sectionRef.current.style.backgroundImage = `url(${bgSrc})`
    }
  }, [loaded, bgSrc])

  return (
    <section className={props.className} ref={sectionRef}>
      <SectionInner>
        <HomeBannerInner>
          <h2>Take your career to the next level</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
            dolor sit amet, consectetur adipiscing elit.
          </p>
          <Button label={'Find out more'} link={'/working-with-us'} />
        </HomeBannerInner>
      </SectionInner>
    </section>
  )
}

const StyledHomeBanner = styled(HomeBanner)`
  background-color: var(--green);
  display: block;
  height: auto;
  ${GutterPaddingLeft}
  ${GutterPaddingRight}
    display: flex;
  align-items: center;
  justify-content: flex-start;
  background-position: right top;
  transition: background-position 200ms ease;
  background-size: cover;
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
