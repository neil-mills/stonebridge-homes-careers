import React, { FC } from 'react'
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

const TextBlockElement: FC<TextBlockElementProps> = ({ tag, text }) => {
  return React.createElement(tag, {}, text)
}

const TextBlockItem = ({ style, blockChildren }: TextBlockItemProps) => {
  const tag: string = style === 'normal' ? 'p' : style
  return blockChildren.map(({ text }, i) => (
    <TextBlockElement key={i} tag={tag} text={text} />
  ))
}

const TextBlock: FC<TextBlockType> = props => {
  return (
    <Section
      className={props.className}
      marginTop={props.marginTop}
      marginBottom={props.marginBottom}
    >
      <Heading heading={props.heading} />
      {props.text.map(({ children, style }, i) => (
        <TextBlockItem key={i} blockChildren={children} style={style} />
      ))}
    </Section>
  )
}

const StyledTextBlock = styled(TextBlock)`
  h3 {
    ${HeadingMediumKeyline}
  }
`
export default StyledTextBlock
