import React, { FC, useContext, useRef } from 'react'
import ImageAndTextBlock from './ImageAndTextBlock'
import AppContext from '../context/AppContext'
import { Block } from '../types'
// import Dialog from '../components/Dialog'
import ApplicationForm from '../components/ApplicationForm'

interface Props {
  heading: string
  text: string
  textBlock?: Block[]
  buttonLabel?: string
  tint?: boolean
}
const SubContractor: FC<Props> = ({
  heading,
  textBlock,
  buttonLabel,
  tint = false,
}) => {
  const {
    setDialogActive,
    setDialogContent,
    stopBodyScroll,
    setPageTabIndex,
    setModalTabIndex,
    dialogRef,
    setPageFocusRef,
    modalTabIndex,
  } = useContext(AppContext)

  const buttonRef = useRef<HTMLElement>(null)

  const openDialog = (e: Event) => {
    console.log(modalTabIndex)
    e.preventDefault()

    if (setPageTabIndex) {
      setPageTabIndex(-1)
    }
    if (setModalTabIndex) {
      console.log('setting')
      setModalTabIndex(0)
    }
    if (stopBodyScroll) {
      stopBodyScroll(true)
    }
    if (dialogRef?.current) {
      dialogRef?.current.focus()
    }
    if (setPageFocusRef) {
      setPageFocusRef(buttonRef)
    }
    if (setDialogActive && setDialogContent) {
      setDialogContent(
        <>
          <h3>Register as a subcontractor</h3>
          <ApplicationForm
            isSubContractor={true}
            vacancyReference={'VA6'}
            buttonLabel={'Register details'}
            tabIndex={0}
          />
        </>
      )
      setDialogActive(true)
    }
  }

  return (
    <>
      <ImageAndTextBlock
        heading={heading}
        textBlock={textBlock}
        buttonLabel={buttonLabel}
        buttonCallback={openDialog}
        tint={tint}
        buttonRef={buttonRef}
      />
    </>
  )
}

SubContractor.defaultProps = {
  heading: '',
  text: '',
  buttonLabel: '',
}

export default SubContractor
