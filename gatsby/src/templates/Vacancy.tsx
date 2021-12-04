import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'

import { graphql } from 'gatsby'
import styled from 'styled-components'
import Section from '../components/Section'
import Heading from '../components/Heading'
import ArticleHeaderLinks from '../components/ArticleHeaderLinks'
import Button from '../components/Button'
import MetaList from '../components/MetaList'
import VacancyImg from '../assets/images/vacancy-image.jpg'
import { GapMargin } from '../assets/styles/Utils'
import Select from '../components/Select'
import Form, { TextInput, FileInput, CheckboxInput } from '../components/Form'
import { usePeopleHRFetch } from '../hooks/usePeopleHRFetch'
import ArticleTitle from '../components/ArticleTitle'
import { HeadingMediumKeyline } from '../assets/styles/Typography'
import {
  ApplicantData,
  VacancyType,
  CheckDuplicateApplicantResult,
  CreateNewApplicantResult,
} from '../types'

const StyledPicture = styled.picture`
  display: block;
  width: 100%;
  height: auto;
  position: relative;
  margin-bottom: 2rem;
  @media screen and (min-width: 768px) {
    margin-bottom: 0;
    &:before {
      content: '';
      padding-top: 100%;
      display: block;
    }
    align-items: top;
    img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: right top;
    }
  }
`
const StyledForm = styled.div`
  display: grid;
  align-items: top;
  ${GapMargin}
  grid-template-rows: repeat(2, auto);
  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: auto;
  }
`
interface Props {
  data: {
    vacancy: VacancyType
  }
  className: string
}

const SingleVacancyPage: FC<Props> = ({ data, className }) => {
  const defaultValues: ApplicantData = {
    Title: '',
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    File: '',
    Terms: 'false',
    VacancyReference: data.vacancy.Reference,
  }

  const [formValues, setFormValues] = useState(defaultValues)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState('')

  const meta = [
    `Reference: ${data.vacancy.Reference}`,
    `Closing date: ${data.vacancy.ClosingDate}`,
  ]

  const regex =
    /face="(.*?)"|style="(.*?)"|<font(.*?)>|<\/font>|&nbsp;|<p[^>]*><\/p[^>]*>/gi
  let description: string = data.vacancy.JobDescription.replaceAll(regex, '')
  description = description.replaceAll('class="paragraph', '')
  description = description.replaceAll('<p >​</p>', '')
  const headingRegex = /<\s*p[^>]*>([A-Z&\s']+)<\s*\/\s*p\s*>/g
  const bulletRegex = /<\s*p[^>]*>· (.*?)<\s*\/\s*p>/g
  let result: RegExpExecArray | null
  while ((result = headingRegex.exec(description)) !== null) {
    description = description.replace(result[0], `<h3>${result[1]}</h3>`)
  }
  while ((result = bulletRegex.exec(description)) !== null) {
    description = description.replace(
      result[0],
      `<p class="bullet">${result[1]}</p>`
    )
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

    // function isResponse<T>(
    //   response: ResponseType<T> | string
    // ): response is ResponseType<T> {
    //   return (response as ResponseType<T>).Result !== undefined
    // }

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
      if (!response.isError) {
        if (response.Result.IsDuplicate === 'False') {
          //post applicant
          const response = await postCreateNewApplicant()
          if (typeof response === 'object' && response.Result) {
            if (!response.isError) {
              //post applicant cv file
              const { ApplicantId } = response.Result
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
                  console.log(response)
                  if (!response.isError) {
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

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  return (
    <div className={className}>
      <Section as={'div'} marginTop={false}>
        <ArticleHeaderLinks backLink={'/vacancies'} />
        <ArticleTitle>
          <div>
            <Heading
              subHeading={data.vacancy.VacancyType}
              heading={data.vacancy.VacancyName}
              marginBottom={false}
              headingLarger={true}
              level={1}
            />
            <MetaList meta={meta} />
          </div>
          <Button link={'/'} label={'Apply now'} />
        </ArticleTitle>
        <h2>The role</h2>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Section>
      <Section tint={true}>
        <StyledForm>
          <div>
            <StyledPicture>
              <source media="(min-width: 500px)" srcSet={VacancyImg} />
              <img src={VacancyImg} />
            </StyledPicture>
          </div>
          <Form callback={handleSubmit}>
            {isLoading && <p>Sending, please wait...</p>}
            {isError && <p>{isError}</p>}
            <fieldset>
              <legend>Apply now</legend>
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
            </fieldset>
            <Button
              type="submit"
              label={isLoading ? 'Sending' : 'Send application'}
              disabled={isLoading}
            />
          </Form>
        </StyledForm>
      </Section>
    </div>
  )
}

export const query = graphql`
  query ($id: String!) {
    vacancy: vacancy(id: { eq: $id }) {
      id
      City
      ClosingDate(formatString: "D MMM YYYY")
      Company
      Department
      Country
      Experience
      IsHideSalary
      JobBordUrl
      JobDescription
      JobTitle
      Location
      Reference
      SalaryRange
      Status
      VacancyDescription
      VacancyName
      VacancyType
    }
  }
`
const StyledSingleVacancyPage = styled(SingleVacancyPage)`
  h3 {
    ${HeadingMediumKeyline}
  }
  p {
    span {
      color: var(--gold);
      display: inline-block;
      padding-right: 0.5rem;
    }
    @media screen and (min-width: 768px) {
      max-width: 85%;
    }
    &.bullet {
      padding-left: 1.5rem;
      position: relative;
      &:before {
        content: '•';
        position: absolute;
        left: 0;
        top: 0;
        color: var(--gold);
      }
    }
  }
`
export default StyledSingleVacancyPage
