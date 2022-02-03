import React, { FC, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { TextBlockType } from '../types'
import { HeadingMediumKeyline } from '../assets/styles/Typography'
import Section from './Section'
import Heading from './Heading'

interface TextBlockElementProps {
  tag: string
  text: string
}
interface TextBlockItemProps {
  list?: null
  style: string
  blockChildren: { text: string; _type: string }[]
}

const TextBlockElement: FC<TextBlockElementProps> = ({
  tag,
  text,
}): ReactElement => {
  return React.createElement(tag, {}, text)
}

const TextBlockItem = ({
  style,
  blockChildren,
}: TextBlockItemProps): ReactElement<HTMLElement> => {
  const tag: string = style === 'normal' ? 'p' : style
  const textBlock = blockChildren.map(({ text }, i) => (
    <TextBlockElement key={i} tag={tag} text={text} />
  ))
  return <>{textBlock}</>
}

const TextBlock: FC<TextBlockType> = props => {
  return (
    <Section className={props.className} marginTop={true} marginBottom={true}>
      {props.heading && <Heading heading={props.heading} />}
      {props.text && (
        <>
          {props.text.map(({ children, style }, i) => (
            <TextBlockItem key={i} blockChildren={children} style={style} />
          ))}
        </>
      )}
    </Section>
  )
}

const StyledTextBlock = styled(TextBlock)`
  h3 {
    ${HeadingMediumKeyline}
  }
`
export default StyledTextBlock
