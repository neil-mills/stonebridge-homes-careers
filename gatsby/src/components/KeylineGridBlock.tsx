import React, { FC, useState, useRef, useContext, useEffect } from 'react'
import styled, { css } from 'styled-components'
import Section from './Section'
import KeylineGrid, { KeylineGridItem } from './KeylineGrid'
import IconTitle from './IconTitle'
import Heading from './Heading'
import ArrowLink from './ArrowLink'
import { useOnClickOutside } from '../hooks/useOnClickOutside'
import AppContext from '../context/AppContext'

interface IconCardProps {
  _key: string
  icon: { asset: { originalFilename: string; url: string; title: string } }
  subTitle?: string
  title: string
  text: string
  index: number
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
const TitleCard = styled.button<{ isActive: boolean }>`
  ${CardStyles}
  border: none;
  display: ${({ isActive }) => (isActive ? 'none' : 'flex')};
  background-color: transparent;
  cursor: pointer;
  z-index: ${({ isActive }) => (isActive ? 1 : 2)};
  &:focus {
    outline: 2px solid var(--black);
  }
  outline-offset: -2px;
  @media screen and (min-width: 768px) {
    padding-bottom: 8rem;
  }
`
const OverlayCard = styled.div<{ isActive: boolean }>`
  ${CardStyles}
  position: relative;

  p {
    margin: 0;
  }
  span[aria-hidden='true'] {
    visibility: hidden;
  }
  @media screen and (min-width: 768px) {
    align-items: center;

    transform: ${({ isActive }) =>
      isActive ? 'translateY(0)' : 'translateY(99%)'};
    transition: all 200ms ease;
    will-change: transform;
    background-color: var(--green);
    color: var(--white);
    opacity: ${({ isActive }) => (isActive ? 1 : 0)};
    z-index: ${({ isActive }) => (isActive ? 2 : 1)};
  }
`
const MoreIcon = styled(ArrowLink)`
  position: absolute;
  display: none;
  left: 50%;
  transform: translateX(-50%);
  bottom: 20px;
  @media screen and (min-width: 768px) {
    display: flex;
  }
`
const IconCard: FC<IconCardProps> = ({
  icon,
  title,
  subTitle,
  text,
  index,
}) => {
  const [isActive, setIsActive] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { pageTabIndex } = useContext(AppContext)
  const handleCardClick = () => {
    setIsActive(true)
  }
  const handleCardFocus = () => {
    setIsActive(false)
  }
  const handleCardBlur = () => {
    setIsActive(false)
  }
  useOnClickOutside(cardRef, handleCardBlur)

  return (
    <IconCardStyles ref={cardRef}>
      <TitleCard
        type="button"
        tabIndex={isActive ? -1 : pageTabIndex}
        onClick={handleCardClick}
        isActive={isActive}
        // onBlur={handleCardBlur}
        onFocus={handleCardFocus}
        aria-label={`Read more about ${title}`}
      >
        <IconTitle
          icon={icon.asset.url}
          subTitle={subTitle}
          title={title}
          align={'left'}
          id={`title-${index}`}
        />
        <MoreIcon
          color={'gold'}
          label={'More'}
          visibleLabel={false}
          tabIndex={-1}
        />
      </TitleCard>
      <OverlayCard isActive={isActive} tabIndex={-1}>
        <p>
          {!isActive && <span aria-hidden="true">{text}</span>}
          <span role="status">{isActive && text}</span>
        </p>
        <MoreIcon
          color={'gold'}
          label={'Close'}
          isClose={true}
          visibleLabel={true}
          callback={handleCardBlur}
          isFocussed={false}
          tabIndex={isActive ? pageTabIndex : -1}
        />
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
        {props.items.map((item, i: number) => (
          <KeylineGridItem key={i}>
            <IconCard {...item} index={i + 1} />
          </KeylineGridItem>
        ))}
      </KeylineGrid>
    </Section>
  )
}

export default KeylineGridBlock
