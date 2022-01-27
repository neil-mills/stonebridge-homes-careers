import React, { FC } from 'react'
import styled, { css } from 'styled-components'
import Section from './Section'
import KeylineGrid, { KeylineGridItem } from './KeylineGrid'
import Spacer from './Spacer'
import IconTitle from './IconTitle'
import Heading from './Heading'
import ArrowLink from './ArrowLink'

interface IconCardProps {
  _key: string
  icon: { asset: { originalFilename: string; url: string; title: string } }
  subTitle?: string
  title: string
  text: string
}

interface Props {
  heading: string
  headingLevel?: string
  subHeading?: string
  text?: string
  columns?: number
  tint?: boolean
  marginTop?: boolean
  marginBottom?: boolean
  items: IconCardProps[]
}

const IconCardStyles = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  text-align: left;
  @media screen and (min-width: 768px) {
    padding: 0 4rem;
    text-align: left;
    padding: 0;
    display: grid;
    overflow: hidden;
    cursor: pointer;
    &:hover {
      div:last-child {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
`
const CardStyles = css`
  @media screen and (min-width: 768px) {
    grid-area: 1 / 1 / 1 / 1;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 3rem 5rem;
  }
  @media screen and (min-width: 1024px) {
    padding: 6rem 3rem;
  }
`
const TitleCard = styled.div`
  ${CardStyles}
  @media screen and (min-width: 768px) {
    padding-bottom: 8rem;
  }
`
const OverlayCard = styled.div`
  ${CardStyles}
  position: relative;
  p {
    margin: 0;
  }
  @media screen and (min-width: 768px) {
    align-items: center;
    transform: translateY(99%);
    transition: all 200ms ease;
    will-change: transform;
    background-color: var(--green);
    color: var(--white);
    opacity: 0;
  }
`
const MoreIcon = styled(ArrowLink)`
  position: absolute;
  display: none;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  @media screen and (min-width: 768px) {
    display: block;
  }
`
const IconCard: FC<IconCardProps> = ({ icon, title, subTitle, text }) => {
  return (
    <IconCardStyles>
      <TitleCard>
        <IconTitle
          icon={icon.asset.url}
          subTitle={subTitle}
          title={title}
          align={'left'}
        />
        <MoreIcon color={'gold'} label={'More'} visibleLabel={false} />
      </TitleCard>
      <OverlayCard>
        <p>{text}</p>
      </OverlayCard>
    </IconCardStyles>
  )
}

const KeylineGridBlock: FC<Props> = props => {
  return (
    <Section
      tint={props.tint}
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
    >
      <Heading heading={props.heading} text={props.text} marginBottom={true} />
      <KeylineGrid columns={props.columns || 3}>
        {props.items.map(item => (
          <KeylineGridItem key={item._key}>
            <IconCard {...item} />
          </KeylineGridItem>
        ))}
      </KeylineGrid>
    </Section>
  )
}

export default KeylineGridBlock
