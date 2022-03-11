import React, {
  FC,
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from 'react'
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
  tabIndex: number
  isFocussed?: boolean
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

  const [isUploadError, setIsUploadError] = useState(false)
  const [formValues, setFormValues] = useState(defaultValues)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const fieldsRef = useRef<HTMLElement[]>([])

  const handleNotification = () => {
    const scrollToNotification = useScrollIntoView(formRef.current)
    scrollToNotification()
  }

  useEffect(() => {
    if (props.isFocussed && fieldsRef.current[0]) {
      fieldsRef.current[0].focus()
    }
  }, [props.isFocussed])

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

  const handleValidation = (e: FormEvent) => {
    e.preventDefault()
    let error = false
    for (const ref of fieldsRef.current) {
      const el = ref as HTMLSelectElement
      if (!el.validity.valid) {
        el.reportValidity()
        error = true
        const scrollToField = useScrollIntoView(el)
        setTimeout(() => {
          scrollToField()
        }, 100)
        break
      }
    }
    if (!error) {
      handleSubmit()
    }
  }

  useEffect(() => {
    const uploadFile = async () => {
      const response = await postUploadApplicantDocument()
      if (
        typeof response === 'object' &&
        response.Result &&
        !response.isError &&
        response.Status === 0
      ) {
        setIsLoading(false)
        setFormValues({ ...defaultValues })
        setIsError('Your application has been submitted successfully')
      } else {
        setIsLoading(false)
        setIsUploadError(true)
        setIsError('There was an error uploading your cv, please try again.')
      }
      handleNotification()
    }
    if (formValues.File) {
      uploadFile()
    }
  }, [formValues])

  const toBase64 = (file: File) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result)
      reader.onerror = error => reject(error)
    })

  const processFile = async () => {
    if (FileRef) {
      const base64File: unknown = await toBase64(FileRef)
      setFormValues(prevState => ({
        ...prevState,
        File: String(base64File).replace(/^(data:)(.*)(base64,)/g, ''),
      }))
    } else {
      setIsLoading(false)
      setIsError('Server error, please try again.')
      handleNotification()
    }
  }

  const handleSubmit = async () => {
    setIsError('')
    setIsLoading(true)
    //Route 1
    //do this if first submit
    if (!formValues.ApplicantId && !isUploadError) {
      //check for duplicate application
      const response = await postCheckDuplicateApplicant()
      if (
        typeof response === 'object' &&
        response.Result &&
        response.Status === 0 &&
        !response.isError &&
        response.Result.IsDuplicate === 'False'
      ) {
        //post application
        const response = await postCreateNewApplicant()
        if (
          typeof response === 'object' &&
          response.Result &&
          !response.isError &&
          response.Status === 0
        ) {
          const { ApplicantId } = response.Result
          setFormValues(prevState => ({ ...prevState, ApplicantId }))
          //upload the file
          if (!props.isSubContractor) {
            processFile()
          } else {
            setIsLoading(false)
            setIsError('Your application has been submitted successfully')
          }
        } else {
          //post application failed
          setIsLoading(false)
          setIsError(
            'There was an error posting your application, please try again.'
          )
        }
      } else {
        //is a duplicate application
        setIsLoading(false)
        setIsError('You have already applied for this vacancy.')
      }
      handleNotification()
    }
    //Route 2
    //just upload the file, if the application was submitted ok, but there was an upload error.
    if (formValues.ApplicantId && isUploadError && !props.isSubContractor) {
      processFile()
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
    <Form ref={formRef} callback={handleValidation}>
      {isLoading && (
        <StyledNotification aria-live="polite">
          Sending, please wait...
        </StyledNotification>
      )}
      {isError && (
        <StyledNotification aria-live="polite">{isError}</StyledNotification>
      )}
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
          disabled={isLoading}
          required={true}
          tabIndex={props.tabIndex}
          ref={(element: HTMLSelectElement) => (fieldsRef.current[0] = element)}
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
          ref={(element: HTMLInputElement) => (fieldsRef.current[1] = element)}
          tabIndex={props.tabIndex}
          disabled={isLoading}
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
          ref={(element: HTMLInputElement) => (fieldsRef.current[2] = element)}
          tabIndex={props.tabIndex}
          disabled={isLoading}
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
          ref={(element: HTMLInputElement) => (fieldsRef.current[3] = element)}
          tabIndex={props.tabIndex}
          disabled={isLoading}
        />
      </div>
      <div>
        <label htmlFor={'PhoneNumber'}>Phone</label>
        <p id={'PhoneNumberHint'} className="hint">
          Include country code and remove first zero from number
        </p>
        <TextInput
          type={'tel'}
          pattern={'([+]{1}[0-9]{2}\\s?[1-9]{1}[0-9]{3}\\s?[0-9]{6,10})'}
          id={'PhoneNumber'}
          maxLength={16}
          value={formValues.PhoneNumber}
          required={true}
          onChange={handleChange}
          placeholder={'+447000000000'}
          ref={(element: HTMLInputElement) => (fieldsRef.current[4] = element)}
          tabIndex={props.tabIndex}
          ariaDescribedBy={'PhoneNumberHint'}
          disabled={isLoading}
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
            ref={(element: HTMLInputElement) =>
              (fieldsRef.current[5] = element)
            }
            tabIndex={props.tabIndex}
            disabled={isLoading}
          />
        </div>
      ) : (
        <div>
          <label htmlFor={'CV'}>CV</label>
          <p id={'CVHint'} className="hint">
            Document file size must be 15mb or under
          </p>
          <FileInput
            id={'CV'}
            value={formValues.DocumentName}
            callback={handleChange}
            required={true}
            ref={(element: HTMLInputElement) =>
              (fieldsRef.current[5] = element)
            }
            tabIndex={props.tabIndex}
            ariaDescribedBy={'CVHint'}
            disabled={isLoading}
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
          ref={(element: HTMLInputElement) => (fieldsRef.current[6] = element)}
          tabIndex={props.tabIndex}
          disabled={isLoading}
        />
      </div>
      <Button
        type="submit"
        label={isLoading ? 'Sending' : props.buttonLabel}
        disabled={isLoading}
        tabIndex={props.tabIndex}
      />
    </Form>
  )
}

ApplicationForm.defaultProps = {
  isSubContractor: false,
}

export default ApplicationForm
