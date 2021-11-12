import React, { FC } from 'react'
import { imageAndTextBlock } from '../types/imageAndTextBlock'
import styled from 'styled-components'
import { Link } from 'gatsby'

const BlockStyles = styled.div`
  display: grid;
`
const ImageAndTextBlock: FC<imageAndTextBlock> = (props): JSX.Element => {
  const {
    heading,
    text,
    image,
    backgroundImage,
    paralaxImage,
    textBox,
    textPosition,
    buttonLabel,
    pageLink,
    externalUrl,
  } = props

  const renderContent = () => {
    return (
      <>
        <div data-inset={textBox ? 'true' : null} data-pos={textPosition}>
          {heading && <h2>{heading}</h2>}
          {text && <p>{text}</p>}
          {renderButton}
        </div>
        {image && <div>{image}</div>}
      </>
    )
  }

  const renderButton = () => {
    if (!buttonLabel) return null
    if (pageLink) {
      return <Link to="">{buttonLabel}</Link>
    } else if (externalUrl) {
      return (
        <button
          onClick={() => {
            window.location.href = externalUrl
          }}
        >
          {buttonLabel}
        </button>
      )
    }
  }

  return (
    <BlockStyles
      data-paralax={paralaxImage ? 'true' : null}
      data-bg={backgroundImage ? image : null}
    >
      {renderContent}
    </BlockStyles>
  )
}

export default ImageAndTextBlock
