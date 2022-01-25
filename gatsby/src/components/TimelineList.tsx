import React, { FC } from 'react'
import styled from 'styled-components'
import { HeadingStyle } from '../assets/styles/Typography'
import { VerticalSpacingBottom } from '../assets/styles/Utils'
import Section from '../components/Section'

interface TimelineItem {
  _key: string
  year: string
  text: string
  highlighted?: boolean
}
interface TimelineSection {
  _key: string
  title: string
  items: TimelineItem[]
}

interface Props {
  sections: TimelineSection[]
}
const StyledTimelineList = styled.dl`
  display: flex;
  flex-direction: column;
  position: relative;
  justify-content: flex-start;
  grid-auto-rows: auto;
  ${VerticalSpacingBottom}
  &:last-child {
    margin-bottom: 0;
  }
`
const StyledTimelineItem = styled.div<{ highlighted: boolean }>`
  margin: 0 0 0.5rem 3rem;
  padding: 2rem 1rem;
  position: relative;
  border-radius: 1rem;
  background-color: ${({ highlighted }) =>
    highlighted ? 'var(--green-tint)' : 'var(--white)'};
  &:before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: block;
    background-color: var(--white);
    border: 3px solid var(--gold);
    position: absolute;
    top: 1.6rem;
    left: -3rem;
    z-index: 2;
  }
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: -2rem;
    bottom: -0.5rem;
    width: 1px;
    background-color: var(--gold);
    z-index: 1;
  }

  dt {
    ${HeadingStyle}
    line-height: 1;
    font-size: var(--font-medium);
    margin-bottom: 1rem;
  }
  dd {
    margin: 0;
  }
  &:first-child {
    &:after {
      top: 2.5rem;
    }
  }
  &:last-child {
    &:after {
      bottom: auto;
      height: 2.5rem;
    }
  }
`

const TimelineSection: FC<TimelineSection> = ({ title, items }) => {
  return (
    <>
      <h2>{title}</h2>
      <StyledTimelineList>
        {items.map(item => (
          <TimelineItem key={item._key} {...item} />
        ))}
      </StyledTimelineList>
    </>
  )
}
const TimelineItem: FC<TimelineItem> = ({
  year,
  text,
  highlighted = false,
}) => {
  return (
    <StyledTimelineItem highlighted={highlighted}>
      <dt>{year}</dt>
      <dd>{text}</dd>
    </StyledTimelineItem>
  )
}
const TimelineList: FC<Props> = ({ sections }) => {
  return (
    <Section marginTop={true} marginBottom={true}>
      {sections.map(section => (
        <TimelineSection key={section._key} {...section} />
      ))}
    </Section>
  )
}

export default TimelineList
