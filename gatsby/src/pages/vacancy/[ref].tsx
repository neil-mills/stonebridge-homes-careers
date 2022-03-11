import React, { FC, useRef, useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import Section from '../../components/Section'
import Heading from '../../components/Heading'
import ArticleHeaderLinks from '../../components/ArticleHeaderLinks'
import Button from '../../components/Button'
import MetaList from '../../components/MetaList'
import VacancyImg from '../../assets/images/vacancy-image.jpg'
import { GapMargin } from '../../assets/styles/Utils'
import ArticleTitle from '../../components/ArticleTitle'
import { HeadingLarge, BulletItem } from '../../assets/styles/Typography'
import ApplicationForm from '../../components/ApplicationForm'
import { VacancyType } from '../../types'
import { useScrollIntoView } from '../../hooks/useScrollIntoView'
import AppContext from '../../context/AppContext'
import { format } from 'date-fns'

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
  h3 {
    ${HeadingLarge}
  }
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

const SingleVacancyPage: FC<Props> = ({ className }) => {
  const [vacancy, setVacancy] = useState<VacancyType>()
  const [description, setDescription] = useState('')
  const [meta, setMeta] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const formRef = useRef(null)
  const [focusForm, setFocusForm] = useState(false)
  const { pageTabIndex, setPageTitle } = useContext(AppContext)

  useEffect(() => {
    const getVacancy = async () => {
      let VacancyReference = ''
      if (typeof window !== 'undefined') {
        const path = window.location.href.split('/')
        VacancyReference = path[path.length - 1].toUpperCase()
        setTimeout(() => {
          window.scrollTo(0, 0)
        }, 0)
      }
      const jsonData = {
        APIKey: process.env.GATSBY_APIKEY,
        Action: 'GetVacancy',
        VacancyReference,
      }

      try {
        setIsError(false)
        setIsLoading(true)
        const res = await fetch('https://api.peoplehr.net/Vacancy/', {
          method: 'POST',
          headers: {
            'Content-Type': 'text/json',
          },
          body: JSON.stringify(jsonData),
        })
        const vacancyResult = await res.json()
        console.log(vacancyResult)
        const { isError, Status, Result } = vacancyResult
        if (isError || Status > 4) setIsError(true)
        setVacancy(Result)
      } catch (err) {
        setIsError(true)
      }
    }
    getVacancy()

    return () => clearTimeout()
  }, [])

  useEffect(() => {
    if (isLoading && !isError && vacancy) {
      const vacancyMeta = []
      if (vacancy.Reference) vacancyMeta.push(`Reference: ${vacancy.Reference}`)
      if (vacancy.ClosingDate)
        vacancyMeta.push(
          `Closing date: ${format(
            new Date(vacancy.ClosingDate),
            'dd LLL yyyy'
          )}`
        )
      if (vacancyMeta.length) setMeta(vacancyMeta)
      const regex =
        /face="(.*?)"|style="(.*?)"|<font(.*?)>|<\/font>|&nbsp;|<p[^>]*><\/p[^>]*>/gi
      let description: string = vacancy.JobDescription.replace(regex, '')
      description = description.replace(/class="paragraph/g, '')
      description = description.replace(/<p\s?>\s?<\/p>/g, '')
      description = description.replace(/<span\s?>\s?<\/span>/g, '')
      description = description.replace(/<p[^>]*?><\/p>/g, '')
      description = description.replace(/\u200B/g, '')
      const headingRegex = /<\s*p[^>]*>([A-Z&\s']+)<\s*\/\s*p\s*>/g
      const headingRegex2 =
        /<\s*p[^>]*>(<span\s?><\/span>)?(<span\s?>)?([A-Z&\s']+)(<\/span>)?<\s*\/\s*p\s*>/g
      const bulletRegex = /<\s*p[^>]*>• (.*?)<\s*\/\s*p>/g
      const spanRegex = /<span\s?>([a-zA-Z/\-:·,£\0-9&\s]+)<\/span\s?>/g
      const spanRegex2 = /<span\s?>·<\/span>/g
      const ulRegex = /<ul\s?><li>(.*?)<\/li><\/ul>/g
      let result: RegExpExecArray | null
      while ((result = headingRegex.exec(description)) !== null) {
        description = description.replace(result[0], `<h3>${result[1]}</h3>`)
      }
      while ((result = headingRegex2.exec(description)) !== null) {
        description = description.replace(result[0], `<h3>${result[3]}</h3>`)
      }
      while ((result = spanRegex.exec(description)) !== null) {
        description = description.replace(result[0], result[1])
      }
      description = description.replace(spanRegex2, '• ')

      while ((result = spanRegex.exec(description)) !== null) {
        description = description.replace(result[0], result[1])
      }
      while ((result = ulRegex.exec(description)) !== null) {
        description = description.replace(
          result[0],
          `<p class="bullet">${result[1]}</p>`
        )
      }
      description = description.replace(/·/g, '• ')

      while ((result = bulletRegex.exec(description)) !== null) {
        description = description.replace(
          result[0],
          `<p class="bullet">${result[1]}</p>`
        )
      }
      setDescription(description)
      setIsLoading(false)
      if (setPageTitle) {
        setPageTitle(
          `Stonebridge Homes Careers - Vacancies - ${vacancy.VacancyName}`
        )
      }
    }
  }, [vacancy])

  const handleClick = () => {
    const scrollToForm = useScrollIntoView(formRef.current)
    scrollToForm()
    setTimeout(() => {
      setFocusForm(true)
    }, 1000)
  }

  return (
    <div className={className}>
      <Section as={'div'} marginTop={false} marginBottom={true}>
        <ArticleHeaderLinks backLink={'/vacancies'} />
        <ArticleTitle>
          <div>
            <Heading
              subHeading={vacancy?.VacancyType || ''}
              heading={vacancy?.VacancyName || ''}
              marginBottom={false}
              headingLarger={true}
              level={1}
              isLoading={isLoading}
            />
            <MetaList meta={meta} isLoading={isLoading} />
          </div>
          {!isLoading && (
            <Button
              tabIndex={pageTabIndex}
              label={'Apply now'}
              callback={handleClick}
            />
          )}
        </ArticleTitle>
        <h2 data-skeleton={isLoading}>The role</h2>
        {isLoading ? (
          <div data-skeleton={true}>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
            <p>
              We are looking for a committed and passionate Part Exchange &amp;
              Legal Progression Manager to join our outstanding Sales Team.
            </p>
          </div>
        ) : (
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}
      </Section>
      {!isLoading && vacancy && (
        <Section tint={true} marginTop={true} marginBottom={true} ref={formRef}>
          <StyledForm>
            <div>
              <StyledPicture>
                <source media="(min-width: 500px)" srcSet={VacancyImg} />
                <img src={VacancyImg} alt="Man looking at computer screen" />
              </StyledPicture>
            </div>
            <div>
              <h3>Apply now</h3>
              <div>
                <ApplicationForm
                  isSubContractor={false}
                  buttonLabel={'Send application'}
                  vacancyReference={vacancy?.Reference}
                  tabIndex={pageTabIndex}
                  isFocussed={focusForm}
                />
              </div>
            </div>
          </StyledForm>
        </Section>
      )}
    </div>
  )
}

const StyledSingleVacancyPage = styled(SingleVacancyPage)`
  p {
    @media screen and (min-width: 768px) {
      max-width: 85%;
    }
  }
  .description {
    li {
      ${BulletItem}
    }
  }
`
export default StyledSingleVacancyPage
