import React, { FC } from 'react'
import styled from 'styled-components'
import { GutterMarginTop, GutterMarginBottom } from '../assets/styles/Utils'

interface SpacerProps {
  marginTop?: boolean
  marginRight?: boolean
  marginBottom?: boolean
  marginLeft?: boolean
}

const SpacerStyles = styled.div<SpacerProps>`
  margin-top: ${({ marginTop }) => (marginTop ? GutterMarginTop : 'none')};

  margin-bottom: ${({ marginBottom }) =>
    marginBottom ? GutterMarginBottom : 'none'};
`
const Spacer: FC<SpacerProps> = ({
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  children,
}) => {
  return (
    <SpacerStyles
      marginTop={marginTop}
      marginRight={marginRight}
      marginBottom={marginBottom}
      marginLeft={marginLeft}
    >
      {children}
    </SpacerStyles>
  )
}

export default Spacer
