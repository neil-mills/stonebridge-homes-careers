import React, { FC, useContext } from 'react'
import ImageBanner from '../components/ImageBanner'
import ParallaxImage from '../components/ParallaxImage'
import ImageAndTextBlock from '../components/ImageAndTextBlock'
import Banner from '../assets/images/working-with-us-banner.jpg'
import BannerLg from '../assets/images/working-with-us-banner-lg.jpg'
import CultureImg from '../assets/images/culture-image.jpg'
import CultureImgLg from '../assets/images/culture-image-lg.jpg'
import People from '../components/People'
import ParallaxImg from '../assets/images/working-with-us-parallax.jpg'
import KeylineGridBlock from '../components/KeylineGridBlock'
import Values from '../components/Values'
import TimelineList from '../components/TimelineList'
import SubContractor from '../components/SubContractor'
import AppContext from '../context/AppContext'
import benefitsData from '../data/benefits'
import valuesData from '../data/values'
import timelineData from '../data/timeline'

const WorkingWithUsPage: FC = (): JSX.Element => {
  const { setDialogActive, setBodyNoScroll } = useContext(AppContext)

  const openDialog = () => {
    if (setDialogActive) {
      setDialogActive(true)
    }
    if (setBodyNoScroll) {
      setBodyNoScroll(true)
    }
  }
  return (
    <>
      <ImageBanner
        src={Banner}
        srcSet={BannerLg}
        heading={'Working with us'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit Lorem ipsum dolor '
        }
        alignText={'left'}
        top={true}
      />
      <ImageAndTextBlock
        src={CultureImg}
        srcSet={CultureImgLg}
        heading={'Stonebridge Culture'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie'
        }
      />
      <People />
      <TimelineList sections={timelineData} />
      <ParallaxImage
        src={{
          asset: {
            fluid: {
              src: ParallaxImg,
            },
          },
        }}
        srcLg={{
          asset: {
            fluid: {
              src: ParallaxImg,
            },
          },
        }}
      />
      <KeylineGridBlock heading={'Our benefits'} items={benefitsData} />
      <Values heading={'Our values'} items={valuesData} tint={true} />
      <SubContractor
        heading={'Become a subcontractor'}
        text={'Be a part of our amazing team at Stonebridge Homes'}
        buttonLabel={'Register your details'}
      />
    </>
  )
}

export default WorkingWithUsPage
