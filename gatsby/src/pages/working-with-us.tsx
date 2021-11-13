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
import ParallaxImgLg from '../assets/images/working-with-us-parallax-lg.jpg'
import Benefits, { benefitsData } from '../components/Benefits'
import Values from '../components/Values'
import TimelineList from '../components/TimelineList'
import Section from '../components/Section'
import Dialog from '../components/Dialog'
import SubContractor from '../components/SubContractor'
import AppContext from '../context/AppContext'

const journeyTimeline = [
  {
    year: '2010',
    text: 'We delivered our first two new homes at Crigglestone.',
  },
  {
    year: '2014',
    text: 'We acquired our first large site of 118 units at Fox Valley, grew our team to 16, moved to Featherbank Court and delivered 32 new homes.',
  },
  {
    year: '2018',
    text: 'We built and sold 145 new homes and were awarded Best Large Development for our site at the former Leeds Girls High School, Headingly at the 2018 Yorkshire 2021 Residential awards.',
    highlighted: true,
  },
  {
    year: '2020',
    text: '2020 saw us deliver 115 homes. In-House awarded us 5 stars for customer satisfaction withan amazing 94% of our customers saying they would recommend us.',
  },
  { year: '2021', text: '64 colleagues and hybrid working introduced' },
]
const growthTimeline = [
  {
    year: '2022',
    text: 'Over 200 homes from 2 regions.',
  },
  {
    year: '2024',
    text: 'Over 350 homes and 2 regional offices with 90 colleagues.',
  },
  {
    year: '2026',
    text: 'Over 600 homes in 3 regions',
    highlighted: true,
  },
]

const WorkingWithUsPage: FC = (): JSX.Element => {
  const [dialogActive, setDialogActive] = useContext(AppContext)

  const openDialog = () => {
    console.log('Open dialog')
    if (setDialogActive) {
      setDialogActive(true)
    }
  }
  return (
    <>
      <ImageBanner
        src={Banner}
        srcLarge={BannerLg}
        heading={'Working with us'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit Lorem ipsum dolor '
        }
        alignText={'left'}
        top={true}
      />
      <ImageAndTextBlock
        src={CultureImg}
        srcLarge={CultureImgLg}
        heading={'Stonebridge Culture'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit nisl risus. Dignissim turpis neque eget in ante pulvinar risus donec. Venenatis pulvinar dolor arcu arcu, lorem adipiscing sed. Volutpat, vitae fusce facilisi tempus donec aliquet.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie'
        }
      />
      <People />
      <Section>
        <h2>Our Journey</h2>
        <TimelineList items={journeyTimeline} />
        <h2>Our growth plans</h2>
        <TimelineList items={growthTimeline} />
      </Section>
      <ParallaxImage src={ParallaxImg} srcLg={ParallaxImg} />
      <Benefits benefits={benefitsData} />
      <Values />
      <ImageAndTextBlock
        heading={'Become a subcontractor'}
        text={'Be a part of our amazing team at Stonebridge Homes'}
        buttonLabel={'Register your details'}
        buttonCallback={openDialog}
      />
      <Dialog>
        <h3 id={'dialogTitle'}>Register as a subcontractor</h3>
        <SubContractor />
      </Dialog>
    </>
  )
}

export default WorkingWithUsPage
