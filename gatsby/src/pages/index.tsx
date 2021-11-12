import React, { FC, useState, useEffect } from 'react'
import HomeBanner from '../components/HomeBanner'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import ImageBanner from '../components/ImageBanner'
import Community from '../components/Community'
import ParallaxImage from '../components/ParallaxImage'
import VideoPoster from '../assets/images/video-poster-md.jpg'
import WorkingWithUsSrc from '../assets/images/working-with-us.jpg'
import WorkingWithUsSrcLg from '../assets/images/working-with-us-lg.jpg'
import ParallaxSrc from '../assets/images/parallax-image.jpg'
import ParallaxSrcLg from '../assets/images/parallax-image-lg.jpg'
import BannerImg from '../assets/images/home-banner-bg.jpg'
import BannerImgLg from '../assets/images/home-banner-bg-lg.jpg'

const HomePage: FC = () => {

  useEffect(() => {
    
  }, [])
  return (
    <>
      <HomeBanner
        title={'Take your career to the next level'}
        text={`Lorem ipsum dolor sit amet, consectetur adipiscing elit Lorem ipsum
        dolor sit amet, consectetur adipiscing elit.`}
        bgSrc={BannerImg}
        bgSrcLg={BannerImgLg}
        btnLabel={'Find out more'}
        btnLink={'/'}
      />
      <ImageAndTextBlock
        heading={'Intro from the MD'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus'
        }
        src={VideoPoster}
        video={true}
        alignText={'right'}
      />
      <ImageBanner
        src={WorkingWithUsSrc}
        srcLarge={WorkingWithUsSrcLg}
        srcAlt={''}
        heading={'Working with us'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit Lorem ipsum dolor '
        }
        buttonLabel={'Find out more'}
        buttonLink={'/working-with-us'}
      />
      <Community title={'Our community'} />
      <ParallaxImage src={ParallaxSrc} srcLg={ParallaxSrcLg} />
      <ImageAndTextBlock
        heading={'Vacancies'}
        text={'Be a part of our amazing team at Stonebridge Homes'}
        buttonLabel={'View job vacancies'}
        buttonLink={'/'}
      />
    </>
  )
}

export default HomePage
