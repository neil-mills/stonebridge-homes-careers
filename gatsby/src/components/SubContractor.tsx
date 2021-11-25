import React, { FC, useContext } from 'react'
import ImageAndTextBlock from './ImageAndTextBlock'
import AppContext from '../context/AppContext'
import Dialog from '../components/Dialog'
import SubContractorForm from './SubContractorForm'

interface Props {
  heading: string
  text: string
  buttonLabel?: string
}
const SubContractor: FC<Props> = ({ heading, text, buttonLabel }) => {
  const { setDialogActive, setBodyNoScroll } = useContext(AppContext)

  const openDialog = () => {
    if (setDialogActive) {
      setDialogActive(true)
    }
    if (setBodyNoScroll) {
      setBodyNoScroll(true)
    }
  }

  return (
    <>
      <ImageAndTextBlock
        heading={heading}
        text={text}
        buttonLabel={buttonLabel}
        buttonCallback={openDialog}
      />
      <Dialog>
        <h3 id={'dialogTitle'}>Register as a subcontractor</h3>
        <SubContractorForm />
      </Dialog>
    </>
  )
}

SubContractor.defaultProps = {
  heading: '',
  text: '',
  buttonLabel: '',
}

export default SubContractor
