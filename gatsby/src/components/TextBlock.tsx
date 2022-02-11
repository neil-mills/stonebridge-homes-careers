import React, { FC, ReactElement, ReactNode } from 'react'
import styled from 'styled-components'
import { TextBlockType, MarkDefsType } from '../types'
import { HeadingMediumKeyline } from '../assets/styles/Typography'
import Section from './Section'
import Heading from './Heading'

interface TextBlockElementProps {
  listItem?: string
  text: string
  marks: string[]
  style: string
  markDefs?: MarkDefsType[]
}

interface TextBlockItemProps {
  list?: null
  style: string
  blockChildren: { text: string; _type: string; marks: string[] }[]
  listItem?: string
  markDefs?: MarkDefsType[]
}

const TextBlockElement: FC<TextBlockElementProps> = ({
  listItem,
  text,
  marks,
  style,
  markDefs,
}): ReactElement => {
  const markDef = marks[0] ? markDefs?.find(def => def._key === marks[0]) : null
  const classes: string[] = []
  const options: { className?: string; href?: string; target?: string } = {}
  let tag = style === 'normal' ? 'p' : style
  if (markDef?._type === 'link') {
    options.href = markDef.href
    options.target = '_blank'
    tag = 'a'
  }
  if (marks.includes('strong')) classes.push('bold')
  if (listItem) classes.push('bullet')
  if (classes.length) options.className = classes.join(' ')
  return React.createElement(tag, options, text)
}

const TextBlockItem = ({
  blockChildren,
  listItem,
  style,
  markDefs,
}: TextBlockItemProps): ReactElement<HTMLElement> => {
  if (blockChildren.length > 1) {
    return (
      <p>
        {blockChildren.map(({ text, marks }, i) => (
          <TextBlockElement
            key={i}
            marks={marks}
            style={'span'}
            text={text}
            listItem={listItem}
            markDefs={markDefs}
          />
        ))}
      </p>
    )
  } else {
    return (
      <TextBlockElement
        marks={blockChildren[0].marks}
        style={style}
        text={blockChildren[0].text}
        listItem={listItem}
      />
    )
  }
}

const TextBlock: FC<TextBlockType> = props => {
  console.log('props=', props)
  return (
    <Section className={props.className} marginTop={true} marginBottom={true}>
      {props.heading && <Heading heading={props.heading} />}
      {props._rawText && (
        <>
          {props._rawText.map(({ children, listItem, style, markDefs }, i) => (
            <TextBlockItem
              key={i}
              blockChildren={children}
              style={style}
              listItem={listItem}
              markDefs={markDefs}
            />
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
