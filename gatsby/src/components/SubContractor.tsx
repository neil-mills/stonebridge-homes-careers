import React, { FC, useContext } from 'react'
import ImageAndTextBlock from './ImageAndTextBlock'
import AppContext from '../context/AppContext'
// import Dialog from '../components/Dialog'
import ApplicationForm from '../components/ApplicationForm'

interface Props {
  heading: string
  text: string
  buttonLabel?: string
  tint?: boolean
}
const SubContractor: FC<Props> = ({
  heading,
  text,
  buttonLabel,
  tint = false,
}) => {
  const { setDialogActive, setDialogContent, stopBodyScroll } =
    useContext(AppContext)

  const openDialog = (e: Event) => {
    e.preventDefault()
    if (setDialogActive && setDialogContent) {
      setDialogContent(
        <>
          <h3>Register as a subcontractor</h3>
          <ApplicationForm
            vacancyReference={'VA6'}
            buttonLabel={'Register details'}
          />
        </>
      )
      setDialogActive(true)
    }
    if (stopBodyScroll) {
      stopBodyScroll(true)
    }
  }

  return (
    <>
      <ImageAndTextBlock
        heading={heading}
        sectionText={text}
        buttonLabel={buttonLabel}
        buttonCallback={openDialog}
        tint={tint}
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
