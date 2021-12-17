import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  src: string
}

const StyledVideo = styled.div`
    overflow: hidden;
    background-color: var(--light-grey);
    position: relative;
    width: 100%;
    &:after {
      content: '';
      padding-top: 56.25%;
      display: block;
    }
    iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
`

const Video: FC<Props> = props => {
  return (
    <StyledVideo>
      <iframe
        src={props.src}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </StyledVideo>
  )
}

// ;<iframe
//   width="560"
//   height="315"
//   src="https://www.youtube.com/embed/V4WDbASQB70"
//   title="YouTube video player"
//   frameBorder="0"
//   allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//   allowFullScreen
// ></iframe>

export default Video
