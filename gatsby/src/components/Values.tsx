import React, { FC } from 'react'
import styled from 'styled-components'
import Section from './Section'
import Heading from './Heading'
import IconTitle from './IconTitle'
import TeamworkIcon from '../assets/svg/icon-teamwork.svg'
import ExcellenceIcon from '../assets/svg/icon-excellence.svg'
import PrideIcon from '../assets/svg/icon-pride.svg'
import PassionIcon from '../assets/svg/icon-passion.svg'
import Spacer from './Spacer'

const ValuesList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, auto);
  li {
    display: flex;
    justify-content: center;
    padding: 2rem;
    border: 1px solid var(--keyline-grey);
    h3 {
      margin: 0;
    }
    @media screen and (max-width: 767px) {
      border-width: 1px 1px 0 0;
      &:nth-child(2n) {
        border-right: 0;
      }
      &:nth-child(-n + 2) {
        border-top: 0;
      }
    }
    @media screen and (min-width: 768px) {
      border-width: 0 1px 0 0;
      padding: 0 2rem;
      &:last-child {
        border-right: 0;
      }
    }
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: auto;
  }
`

interface Item {
  _key: string
  title: string
  icon: { asset: { url: string } }
}
interface Props {
  items: Item[]
  heading: string
  subHeading?: string
  headingLevel?: string
  text?: string
  tint?: boolean
}
const Values: FC<Props> = (props): JSX.Element => {
  return (
    <Section tint={props.tint}>
      <Heading
        heading={props.heading}
        subHeading={props.subHeading}
        text={props.text}
        marginBottom
      />
      <Spacer marginTop={true}>
        <ValuesList>
          {props.items.map((item: Item) => (
            <li key={item._key}>
              <IconTitle icon={item.icon.asset.url} title={item.title} />
            </li>
          ))}
        </ValuesList>
      </Spacer>
    </Section>
  )
}

export default Values
