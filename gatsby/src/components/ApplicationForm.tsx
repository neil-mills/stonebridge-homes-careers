import React, { FC, useState, ChangeEvent, FormEvent, useRef } from 'react'
import styled from 'styled-components'
import Form, {
  Select,
  TextInput,
  FileInput,
  CheckboxInput,
} from '../components/Form'
import Button from './Button'
import { usePeopleHRFetch } from '../hooks/usePeopleHRFetch'
import {
  ApplicantData,
  CheckDuplicateApplicantResult,
  CreateNewApplicantResult,
} from '../types'
import { FontMedium } from '../assets/styles/Typography'
import { useScrollIntoView } from '../hooks/useScrollIntoView'

interface Props {
  buttonLabel: string
  vacancyReference: string
  isSubContractor: boolean
}
const StyledNotification = styled.div`
  padding: 8px;
  color: var(--white);
  background-color: var(--green);
  text-align: left;
  margin: 0;
  font-size: var(--font-xsmall);
  ${FontMedium}
`
const ApplicationForm: FC<Props> = props => {
  const defaultValues: ApplicantData = {
    Title: '',
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    File: '',
    TradeOrProfession: '',
    Terms: 'false',
    VacancyReference: props.vacancyReference,
  }

  const [formValues, setFormValues] = useState(defaultValues)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const formRef = useRef(null)

  const handleNotification = () => {
    const scrollToNotification = useScrollIntoView(formRef)
    scrollToNotification()
  }

  const {
    Title,
    FirstName,
    LastName,
    Email,
    VacancyReference,
    PhoneNumber,
    ApplicantId,
    DocumentName,
    File,
    TradeOrProfession,
    FileRef,
  } = formValues

  const [postCheckDuplicateApplicant, isLoadingPostCheckDuplicateApplicant] =
    usePeopleHRFetch<CheckDuplicateApplicantResult>('CheckDuplicateApplicant', {
      FirstName,
      LastName,
      Email,
      VacancyReference,
    })

  const [postCreateNewApplicant, isLoadingPostCreateNewApplicant] =
    usePeopleHRFetch<CreateNewApplicantResult>('CreateNewApplicant', {
      VacancyReference,
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      OtherContactDetails: `Title: ${Title}${
        TradeOrProfession ? `, Trade or Profession: ${TradeOrProfession}` : ''
      }`,
    })

  const [postUploadApplicantDocument, isLoadingPostUploadApplicantDocument] =
    usePeopleHRFetch<Record<string, never>>('uploadapplicantdocument', {
      ApplicantId,
      DocumentName,
      Description: 'CV',
      File,
    })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const toBase64 = (file: File) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = error => reject(error)
      })
    setIsError('')
    setIsLoading(true)
    console.log('check duplicate')
    const response = await postCheckDuplicateApplicant()
    if (typeof response === 'object' && response.Result) {
      console.log(response)
      if (!response.isError) {
        if (response.Result.IsDuplicate === 'False') {
          //post applicant
          console.log('create new applicant')
          const response = await postCreateNewApplicant()
          if (typeof response === 'object' && response.Result) {
            console.log(response)
            if (!response.isError) {
              //post applicant cv file
              const { ApplicantId } = response.Result
              setFormValues(prevState => ({ ...prevState, ApplicantId }))
              //convert file to base64
              if (!props.isSubContractor) {
                if (FileRef) {
                  const base64File: unknown = await toBase64(FileRef)
                  setFormValues(prevState => ({
                    ...prevState,
                    File: String(base64File).replace(
                      /^(data:)(.*)(base64,)/g,
                      ''
                    ),
                  }))
                  console.log('upload cv file')
                  const response = await postUploadApplicantDocument()
                  console.log(response)
                  if (typeof response === 'object' && response.Result) {
                    if (!response.isError) {
                      //post application successful
                      setIsLoading(false)
                      setFormValues({ ...defaultValues })
                      setIsError(
                        'Your application has been submitted successfully'
                      )
                      handleNotification()
                    } else {
                      //is api error with post upload document
                      setIsLoading(false)
                      console.log('error with uploading cv')
                      setIsError(
                        'There was an error posting your application, please try again.'
                      )
                      handleNotification()
                    }
                  } else {
                    //is server error with post upload document
                    setIsLoading(false)
                    setIsError('Server error, please try again.')
                    handleNotification()
                  }
                } else {
                  //file wasnt selected
                  setIsLoading(false)
                  setIsError('Server error, please try again.')
                  handleNotification()
                }
              } else {
                //is subcontractor form, no cv to upload, so finish here
                setIsLoading(false)
                setFormValues({ ...defaultValues })
                setIsError('Your application has been submitted successfully')
                handleNotification()
              }
            } else {
              //is api response error with post new applicant request
              console.log('error with new applicant post')
              setIsLoading(false)
              setIsError(
                'There was an error posting your application, please try again.'
              )
              handleNotification()
            }
          } else {
            //is server error with post new applicant request
            setIsLoading(false)
            setIsError('Server error, please try again.')
            handleNotification()
          }
        } else {
          //is duplicate application
          setIsLoading(false)
          setIsError('You have already applied for this vacancy.')
          handleNotification()
        }
      } else {
        //is api response error with check duplicate post
        setIsLoading(false)
        console.log('error checking duplicate')
        setIsError(
          'There was an error posting your application, please try again.'
        )
        handleNotification()
      }
    } else {
      //is server error with check duplicate applicant request
      setIsLoading(false)
      setIsError('Server error, please try again.')
      handleNotification()
    }
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, type } = e.target
    let { value } = e.target
    if (name === 'Terms' && type === 'checkbox') {
      value = String((e.target as HTMLInputElement).checked)
    }
    if (
      name === 'CV' &&
      type === 'file' &&
      (e.target as HTMLInputElement).files
    ) {
      const FileRef = (e.target as HTMLInputElement)?.files?.item(0)
      const DocumentName = (e.target as HTMLInputElement)?.files?.item(0)?.name
      setFormValues(prevState => ({ ...prevState, DocumentName, FileRef }))
    }
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }

  return (
    <Form ref={formRef} callback={handleSubmit}>
      {isLoading && (
        <StyledNotification>Sending, please wait...</StyledNotification>
      )}
      {isError && <StyledNotification>{isError}</StyledNotification>}
      <div>
        <label htmlFor={'title'}>Title</label>
        <Select
          name={'Title'}
          size={'sm'}
          options={[
            { label: 'Mr', value: 'Mr' },
            { label: 'Mrs', value: 'Mrs' },
            { label: 'Miss', value: 'Miss' },
            { label: 'Ms', value: 'Ms' },
            { label: 'Other', value: 'Other' },
          ]}
          value={formValues.Title}
          callback={handleChange}
          required={true}
        />
      </div>
      <div>
        <label htmlFor={'firstName'}>First name</label>
        <TextInput
          type={'text'}
          id={'FirstName'}
          value={formValues.FirstName}
          required={true}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor={'lastName'}>Last name</label>
        <TextInput
          type={'text'}
          id={'LastName'}
          value={formValues.LastName}
          required={true}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor={'email'}>Email</label>
        <TextInput
          type={'email'}
          id={'Email'}
          value={formValues.Email}
          required={true}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor={'PhoneNumber'}>Phone</label>
        <p className="hint">Required format: +44XXXXXXXXXX</p>
        <TextInput
          type={'tel'}
          pattern={'^\\+(\\d{1,2})(\\s*)(\\d{7,15})'}
          id={'PhoneNumber'}
          maxLength={16}
          value={formValues.PhoneNumber}
          required={true}
          onChange={handleChange}
        />
      </div>
      {props.isSubContractor ? (
        <div>
          <label htmlFor={'TradeOrProfession'}>Trade or Profession</label>
          <TextInput
            type={'text'}
            id={'TradeOrProfession'}
            value={formValues.TradeOrProfession}
            required={true}
            onChange={handleChange}
          />
        </div>
      ) : (
        <div>
          <label htmlFor={'cv'}>CV</label>
          <FileInput
            id={'CV'}
            value={formValues.DocumentName}
            callback={handleChange}
            required={true}
          />
        </div>
      )}
      <div>
        <CheckboxInput
          label={'I accept the terms and conditions'}
          id={'Terms'}
          value={formValues.Terms}
          required={true}
          callback={handleChange}
        />
      </div>
      <Button
        type="submit"
        label={isLoading ? 'Sending' : props.buttonLabel}
        disabled={isLoading}
      />
    </Form>
  )
}

ApplicationForm.defaultProps = {
  isSubContractor: false,
}

export default ApplicationForm
