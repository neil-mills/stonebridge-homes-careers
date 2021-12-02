import React, { ChangeEvent, useEffect, useState, FC, useRef } from 'react'
import styled from 'styled-components'
import Button from '../Button'

interface Props {
  id: string
  value?: string
  className?: string
  callback: (e: ChangeEvent<HTMLInputElement>) => void
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
  }
`

export const FileInput: FC<Props> = props => {
  const [label, setLabel] = useState<string>('No file chosen')
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (inputRef?.current?.files?.item(0)?.name) {
      setLabel(inputRef.current.files['0'].name)
    }
  }, [props.value])
  return (
    <StyledFileInput>
      <input
        ref={inputRef}
        name={props.id}
        id={props.id}
        type="file"
        value={props.value}
        onChange={e => props.callback(e)}
      />
      <Button secondary={true} label={'Choose file'} />
      <span>{label}</span>
    </StyledFileInput>
  )
}
