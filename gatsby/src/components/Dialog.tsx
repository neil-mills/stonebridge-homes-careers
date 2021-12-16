import React, { FC, useContext, useEffect, ReactNode } from 'react'
import styled, { css } from 'styled-components'
import CloseIcon from '../assets/svg/close.svg'
import AppContext from '../context/AppContext'

interface DialogProps {
  children?: ReactNode | ReactNode[]
  centred: boolean
}

const StyledDialog = styled.div<{ active: boolean; centred: boolean }>`
  position: fixed;
  overflow-y: auto;
  transition: background-color 500ms ease;
  background-color: ${({ active }) =>
    active ? 'rgba(0, 0, 0, 0.5)' : 'rgba(0, 0, 0, 0)'};
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  transform: ${({ active }) => (active ? 'translateX(0)' : 'translateX(100%)')};
  z-index: 10;
  h3 {
    padding-bottom: 2rem;
    margin-bottom: 2rem;
    border-bottom: 1px solid var(--keyline-grey);
  }

  div[role='dialog'] {
    transition: all 500ms ease;
    height: auto;
    min-height: 100%;
    padding: 6rem 2rem 2rem;
    width: 100%;
    position: absolute;
    background-color: var(--light-grey);
    ${({ centred }) =>
      centred &&
      css`
        left: 50%;
        top: 60%;
        transform: translate(-50%, -50%);
        &[data-active='true'] {
          top: 50%;
        }
      `};
    ${({ centred }) =>
      !centred &&
      css`
        transform: translateX(100%);
        right: 0;
        top: 0;
        &[data-active='true'] {
          transform: translateX(0);
        }
      `};
    z-index: 10;
    display: block;
    @media screen and (min-width: 768px) {
      min-height: auto;
      ${({ centred }) =>
        !centred &&
        css`
          width: auto;
        `};
      ${({ centred }) =>
        centred &&
        css`
          width: 100%;
          max-width: 70vw;
        `};
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
  const nodes =
    props.children instanceof Array ? props.children : [props.children]
  const {
    dialogActive = false,
    setDialogActive,
    setDialogContent,
    stopBodyScroll,
  } = useContext(AppContext)

  const handleClick = () => {
    if (setDialogActive && setDialogContent) {
      setDialogActive(false)
      setDialogContent(null)
    }
    if (stopBodyScroll) {
      stopBodyScroll(false)
    }
  }

  useEffect(() => {
    console.log(`dialog active=${dialogActive}`)
  }, [dialogActive])

  return (
    <StyledDialog active={dialogActive} centred={props.centred}>
      <div tabIndex={-1}></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogTitle"
        data-active={dialogActive}
      >
        {nodes.map(node => node)}
        <CloseButton type="button" onClick={handleClick}>
          <CloseIcon />
        </CloseButton>
      </div>
    </StyledDialog>
  )
}

Dialog.defaultProps = {
  centred: false,
}

export default Dialog
