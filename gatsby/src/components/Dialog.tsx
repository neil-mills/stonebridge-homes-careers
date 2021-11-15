import React, { FC, useContext, useEffect } from 'react'
import styled from 'styled-components'
import CloseIcon from '../assets/svg/close.svg'
import DialogContext from '../context/DialogContext'

interface DialogProps {
  children: React.ReactElement[]
}

const StyledDialog = styled.div<{ active: boolean }>`
  position: fixed;
  overflow-y: auto;
  background-color: transparent;
  transition: transform 200ms ease;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  transform: ${({ active }) => (active ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 10;

  div[role='dialog'] {
    height: auto;
    min-height: 100%;
    padding: 6rem 2rem 2rem;
    width: 100%;
    position: absolute;
    background-color: var(--light-grey);
    top: 0;
    right: 0;
    z-index: 10;
    display: block;
    @media screen and (min-width: 768px) {
      min-height: auto;
      width: auto;
      padding: 8rem 3rem;
    }
  }
`
const CloseButton = styled.button`
  border: none;
  padding: 0;
  position: absolute;
  background-color: transparent;
  top: 1.5rem;
  right: 1.5rem;
  width: 2.4rem;
  height: 2.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  @media screen and (min-width: 768px) {
    top: 3rem;
    right: 3rem;
  }
`

const Dialog: FC<DialogProps> = props => {
  const [dialogActive = false, setDialogActive] = useContext(DialogContext)

  const handleClick = () => {
    if (setDialogActive) {
      setDialogActive(false)
    }
  }

  useEffect(() => {
    console.log(`dialog active=${dialogActive}`)
  }, [dialogActive])

  return (
    <StyledDialog active={dialogActive}>
      <div tabIndex={-1}></div>
      <div role="dialog" aria-modal="true" aria-labelledby="dialogTitle">
        {props.children.map((child: React.ReactElement) => child)}
        <CloseButton type="button" onClick={handleClick}>
          <CloseIcon />
        </CloseButton>
      </div>
    </StyledDialog>
  )
}

export default Dialog
