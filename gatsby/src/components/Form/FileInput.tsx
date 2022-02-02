import React, { ChangeEvent } from 'react'
import styled from 'styled-components'
import Button from '../Button'

interface Props {
  id: string
  value?: string
  className?: string
  required?: boolean
  callback: (e: ChangeEvent<HTMLInputElement>) => void
  tabIndex?: number
}

const StyledFileInput = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  button,
  span {
    margin: 0;
  }
  span {
    padding-left: 2rem;
    font-size: var(--font-xsmall);
  }
  button {
    z-index: 1;
    position: relative;
  }
  input[type='file'] {
    opacity: 0;
    background-color: red;
    position: absolute;
    display: block;
    top: 0;
    left: 0;
    height: 100%;
    cursor: pointer;
    z-index: 2;
    ::-webkit-file-upload-button {
      cursor: pointer;
    }
    &:focus {
      + button {
        outline: 2px solid var(--gold);
      }
    }
  }
`

export const FileInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    return (
      <StyledFileInput tabIndex={-1}>
        <input
          ref={ref}
          name={props.id}
          id={props.id}
          type="file"
          required={props.required}
          onChange={e => props.callback(e)}
          tabIndex={props.tabIndex}
        />
        <Button tabIndex={-1} secondary={true} label={'Choose file'} />
        <span>{props.value || 'No file chosen'}</span>
      </StyledFileInput>
    )
  }
)

FileInput.displayName = 'FileInput'
