import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { VacancyType } from '../types'
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
import ArticleTitle from '../components/ArticleTitle'
import { HeadingMediumKeyline } from '../assets/styles/Typography'

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

const SingleVacancyPage: FC<Props> = ({ data, className }): JSX.Element => {
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
          <Form method={'post'} action={'/'}>
            <fieldset>
              <legend>Apply now</legend>
              <div>
                <label htmlFor={'title'}>Title</label>
                <Select size={'sm'} />
              </div>
              <div>
                <label htmlFor={'firstName'}>First name</label>
                <TextInput
                  type={'text'}
                  id={'firstName'}
                  name={'firstName'}
                  value={''}
                />
              </div>
              <div>
                <label htmlFor={'lastName'}>Last name</label>
                <TextInput
                  type={'text'}
                  id={'lastName'}
                  name={'lastName'}
                  value={''}
                />
              </div>
              <div>
                <label htmlFor={'email'}>Email</label>
                <TextInput
                  type={'text'}
                  id={'email'}
                  name={'email'}
                  value={''}
                />
              </div>
              <div>
                <label htmlFor={'phone'}>Phone</label>
                <TextInput
                  type={'text'}
                  id={'phone'}
                  name={'phone'}
                  value={''}
                />
              </div>
              <div>
                <label htmlFor={'cv'}>CV</label>
                <FileInput id={'cv'} name={'cv'} value={''} />
              </div>
              <div>
                <CheckboxInput
                  label={'I accept the terms and conditions'}
                  name={'accept'}
                  id={'accept'}
                  checked={true}
                  last={true}
                />
              </div>
            </fieldset>
            <Button label={'Send application'} link={'/'} />
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
