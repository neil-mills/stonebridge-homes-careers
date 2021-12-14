import React, { FC, useState, ChangeEvent, FormEvent } from 'react'
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

interface Props {
  buttonLabel: string
  vacancyReference: string
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
    Terms: 'false',
    VacancyReference: props.vacancyReference,
  }

  const [formValues, setFormValues] = useState(defaultValues)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

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
      OtherContactDetails: `Title: ${Title}`,
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
    const response = await postCheckDuplicateApplicant()
    if (typeof response === 'object' && response.Result) {
      if (!response.isError && response.Status !== 6) {
        if (response.Result.IsDuplicate === 'False') {
          //post applicant
          const response = await postCreateNewApplicant()
          if (typeof response === 'object' && response.Result) {
            if (!response.isError && response.Status !== 6) {
              //post applicant cv file
              const { ApplicantId } = response.Result
              console.log('New applicant ')
              setFormValues(prevState => ({ ...prevState, ApplicantId }))
              //convert file to base64
              if (FileRef) {
                const base64File: unknown = await toBase64(FileRef)
                setFormValues(prevState => ({
                  ...prevState,
                  File: String(base64File).replace(
                    /^(data:)(.*)(base64,)/g,
                    ''
                  ),
                }))

                const response = await postUploadApplicantDocument()
                if (typeof response === 'object' && response.Result) {
                  if (!response.isError && response.Status !== 6) {
                    //post application successful
                    setIsLoading(false)
                    setFormValues({ ...defaultValues })
                    setIsError(
                      'Your application has been submitted successfully'
                    )
                  } else {
                    //is api error with post upload document
                    setIsLoading(false)
                    setIsError(
                      'There was an error posting your application, please try again.'
                    )
                  }
                } else {
                  //is server error with post upload document
                  setIsLoading(false)
                  setIsError('Server error, please try again.')
                }
              } else {
                //something went wrong with the file selection
                setIsLoading(false)
                setIsError('Server error, please try again.')
              }
            } else {
              //is api response error with post new applicant request
              setIsLoading(false)
              setIsError(
                'There was an error posting your application, please try again.'
              )
            }
          } else {
            //is server error with post new applicant request
            setIsLoading(false)
            setIsError('Server error, please try again.')
          }
        } else {
          //is duplicate application
          setIsLoading(false)
          setIsError('You have already applied for this vacancy.')
        }
      } else {
        //is api response error with check duplicate post
        setIsLoading(false)
        setIsError(
          'There was an error posting your application, please try again.'
        )
      }
    } else {
      //is server error with check duplicate applicant request
      setIsLoading(false)
      setIsError('Server error, please try again.')
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
    <Form callback={handleSubmit}>
      {isLoading ||
        (isError && (
          <StyledNotification>
            {isLoading && <p>Sending, please wait...</p>}
            {isError && <p>{isError}</p>}
          </StyledNotification>
        ))}

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
        <label htmlFor={'phone'}>Phone</label>
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
      <div>
        <label htmlFor={'cv'}>CV</label>
        <FileInput
          id={'CV'}
          value={formValues.DocumentName}
          callback={handleChange}
          required={true}
        />
      </div>
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

export default ApplicationForm
