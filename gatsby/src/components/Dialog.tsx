import React, { FC, useContext, useEffect, ReactNode, useState } from 'react'
import styled, { css } from 'styled-components'
import CloseIcon from '../assets/svg/close.svg'
import AppContext from '../context/AppContext'

interface DialogProps {
  children?: ReactNode | ReactNode[]
  centred: boolean
}

const StyledDialog = styled.div<{
  active: boolean
  centred: boolean
}>`
  position: fixed;
  overflow-y: auto;
  transition: background-color 500ms ease;
  background-color: ${({ active }) =>
    active ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)'};
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
    height: auto;
    min-height: 100%;
    padding: 6rem 2rem 2rem;
    width: 100%;
    position: absolute;
    display: flex;
    flex-direction: column;
    opacity: 0;
    background-color: var(--light-grey);
    &:focus {
      outline: 2px solid var(--black);
    }
    ${({ centred }) =>
      centred &&
      css`
        left: 50%;
        top: 60%;
        transition: top 250ms ease, opacity 100ms ease;
        transform: translate(-50%, -50%);
        justify-content: center;
        &[data-active='true'] {
          top: 50%;
          opacity: 1;
        }
      `};
    ${({ centred }) =>
      !centred &&
      css`
        transition: transform 250ms ease, opacity 250ms ease;
        right: 0;
        top: 0;
        transform: translateX(100%);
        &[data-active='true'] {
          transform: translateX(0);
          opacity: 1;
        }
      `};
    z-index: 10;
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
  const [isAnimate, setIsAnimate] = useState(false)
  const nodes =
    props.children instanceof Array ? props.children : [props.children]
  const {
    dialogActive = false,
    setDialogActive,
    setDialogContent,
    stopBodyScroll,
    centreDialog,
    setCentreDialog,
    setModalTabIndex,
    modalTabIndex,
    setPageTabIndex,
    dialogRef,
    pageFocusRef,
  } = useContext(AppContext)

  const handleClick = () => {
    if (setDialogActive && setDialogContent && setCentreDialog) {
      setDialogActive(false)
      setDialogContent(null)
      setCentreDialog(false)
    }
    if (stopBodyScroll) {
      stopBodyScroll(false)
    }
    if (setModalTabIndex) {
      setModalTabIndex(-1)
    }
    if (setPageTabIndex) {
      setPageTabIndex(0)
    }
    if (pageFocusRef?.current) {
      pageFocusRef.current.focus()
    }
  }

  useEffect(() => {
    if (!dialogActive) {
      setIsAnimate(false)
    } else {
      setTimeout(() => {
        setIsAnimate(true)
      }, 500)
    }
  }, [dialogActive])

  return (
    <StyledDialog
      active={dialogActive}
      centred={centreDialog}
      tabIndex={-1}
      ref={dialogRef}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialogTitle"
        data-active={isAnimate}
        tabIndex={modalTabIndex}
      >
        <CloseButton
          type="button"
          aria-label="Close"
          onClick={handleClick}
          tabIndex={modalTabIndex}
        >
          <CloseIcon />
        </CloseButton>
        {nodes.map(node => node)}
      </div>
    </StyledDialog>
  )
}

Dialog.defaultProps = {
  centred: false,
}

export default Dialog
