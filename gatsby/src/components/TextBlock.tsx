import React, { FC } from 'react'
import { TextBlockType } from '../types'
import Section from './Section'
import Heading from './Heading'

interface TextBlockElementProps {
  tag: string
  text: string
}
interface TextBlockItemProps {
  style: string
  blockChildren: { text: string; _type: string }[]
}

const TextBlockElement: FC<TextBlockElementProps> = ({ tag, text }) => {
  return React.createElement(tag, {}, text)
}

const TextBlockItem: FC<TextBlockItemProps> = ({ style, blockChildren }) => {
  const tag: string = style === 'normal' ? 'p' : style
  return blockChildren.map(({ text }, i) => (
    <TextBlockElement key={i} tag={tag} text={text} />
  ))
}

const TextBlock: FC<TextBlockType> = props => {
  return (
    <Section>
      <Heading heading={props.heading} />
      {props.text.map(({ children, style }, i) => (
        <TextBlockItem key={i} blockChildren={children} style={style} />
      ))}
    </Section>
  )
}

export default TextBlock
