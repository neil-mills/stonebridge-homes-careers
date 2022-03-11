import React, { FC, useState, useEffect, ChangeEvent, useContext } from 'react'
import Section from './Section'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { Select } from './Form/Select'
import { HeadingStyle, FontMedium } from '../assets/styles/Typography'
import { GoldLink } from '../assets/styles/Utils'
import ArrowIcon from '../assets/svg/arrow-icon.svg'
import { VacancyType } from '../types'
import Heading from './Heading'
import Button from './Button'
import AppContext from '../context/AppContext'
import { FiAlertCircle } from 'react-icons/fi'

const TableStyles = styled.table`
  border-collapse: collapse;
  font-size: var(--font-xsmall);
  ${HeadingStyle}
  line-height: 1;
  width: 100%;
  text-align: left;
  thead {
    display: none;
    color: var(--white);
    font-weight: normal;
    background-color: var(--green);
    tr {
      background-color: transparent;
    }
  }
  th {
    ${FontMedium}
  }
  th,
  td {
    padding: calc(1.5rem + 2px) 1.6rem 1.5rem 1.6rem;
  }
  tr {
    display: grid;
    grid-template-rows: repeat(5, auto);
    filter: drop-shadow(0px 2px 8px rgba(0, 0, 0, 0.15));
    background-color: var(--white);
    border: 1px solid var(--keyline-grey);
    margin-bottom: 2rem;
  }
  td {
    border-bottom: 1px solid var(--keyline-grey);
    &:last-child {
      background-color: var(--light-grey);
      border: none;
    }
  }
  a {
    ${GoldLink}
    margin-top: -1px;
    position: relative;
    display: inline-block;
  }

  @media screen and (min-width: 768px) {
    thead {
      display: table-header-group;
    }
    tbody {
      border: 1px solid var(--keyline-grey);
    }
    tr {
      display: table-row;
      filter: none;
      border-bottom: 1px solid var(--keyline-grey);
      &:nth-child(2n) {
        background-color: var(--light-grey);
      }
      &:last-child {
        border: none;
      }
    }
    td {
      &:last-child {
        text-align: right;
        background-color: transparent;
      }
    }
  }
`
const ArrowLink = styled(Link)`
  position: relative;
  padding-right: 3rem;
  svg {
    position: absolute;
    top: -3px;
    right: 0;
  }
`
const Filters = styled.div`
  display: grid;
  grid-template-rows: repeat(2, auto);
  margin-bottom: 4rem;
  grid-gap: 2rem;
  form {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, auto);
    justify-content: space-between;
    @media screen and (min-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  h3 {
    margin: 0;
  }
  @media screen and (min-width: 768px) {
    grid-template-columns: 0.3fr 0.7fr;
    grid-template-rows: auto;
    grid-gap: 0;
    align-items: center;
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
`

interface Props {
  heading?: string
  subHeading?: string
  text?: string
  filter?: boolean
  limit: string
  buttonLabel?: string
}

interface Option {
  label: string
  value: string
}

const VacancyList: FC<Props> = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [vacancies, setVacancies] = useState<VacancyType[]>([])
  const [locations, setLocations] = useState<Option[]>([])
  const [departments, setDepartments] = useState<Option[]>([])
  const [filteredVacancies, setFilteredVacancies] = useState<VacancyType[]>([])
  const [selectedFilters, setSelectedFilters] = useState({
    location: '',
    department: '',
  })
  const { pageTabIndex } = useContext(AppContext)

  const handleFilter = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target
    setSelectedFilters(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  useEffect(() => {
    const fetchVacancies = async () => {
      const jsonData = {
        APIKey: process.env.GATSBY_APIKEY,
        Action: 'GetAllVacancies',
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
        const vacanciesResult = await res.json()
        setIsLoading(false)
        const { isError, Status, Result } = vacanciesResult
        setIsError(Status === 6 || isError)

        setVacancies(
          props.limit !== 'all'
            ? Result.filter(
                (vacancy: VacancyType, i: number) =>
                  i < parseInt(props.limit) &&
                  vacancy.Reference !== 'VA6' &&
                  (new Date(vacancy.ClosingDate).getTime() >=
                    new Date().getTime() ||
                    vacancy.Reference === 'VA7' ||
                    !vacancy.ClosingDate)
              )
            : Result.filter(
                (vacancy: VacancyType) =>
                  (new Date(vacancy.ClosingDate).getTime() >=
                    new Date().getTime() ||
                    vacancy.Reference === 'VA7' ||
                    !vacancy.ClosingDate) &&
                  vacancy.Reference !== 'VA6'
              )
        )
      } catch (err) {
        setIsError(true)
      }
    }
    fetchVacancies()
  }, [])

  useEffect(() => {
    if (vacancies.length) {
      const locations = [
        ...new Set(vacancies.map(({ Location }: VacancyType) => Location)),
      ].map(location => ({ label: location, value: location }))
      setLocations(locations)

      const departments = [
        ...new Set(vacancies.map(({ Department }: VacancyType) => Department)),
      ].map(department => ({ label: department, value: department }))
      setDepartments(departments)

      const { location: selectedLocation, department: selectedDepartment } =
        selectedFilters

      let filteredResults = vacancies
      if (selectedLocation)
        filteredResults = filteredResults.filter(
          ({ Location }: VacancyType) => Location === selectedLocation
        )
      if (selectedDepartment)
        filteredResults = filteredResults.filter(
          ({ Department }: VacancyType) => Department === selectedDepartment
        )
      setFilteredVacancies(filteredResults)
    }
  }, [vacancies, selectedFilters])

  return (
    <Section tint={true} marginTop={true} marginBottom={true}>
      {props.heading && (
        <Heading
          heading={props.heading}
          subHeading={props.subHeading}
          text={props.text}
        />
      )}
      {isLoading && <p>Loading current vacancies, please wait.</p>}
      {isError && (
        <p>
          <FiAlertCircle /> There was an error loading our current vacancies at
          this time. Please try again later.
        </p>
      )}
      {filteredVacancies.length ? (
        <>
          {props.filter && (
            <Filters>
              <h3>
                {filteredVacancies.length}{' '}
                {filteredVacancies.length === 1 ? ' Vacancy' : ' Vacancies'}
              </h3>
              <form>
                <Select
                  name={'location'}
                  label={'Location'}
                  options={locations}
                  value={selectedFilters.location}
                  callback={handleFilter}
                  tabIndex={pageTabIndex}
                />
                <Select
                  name={'department'}
                  label={'Department'}
                  options={departments}
                  value={selectedFilters.department}
                  callback={handleFilter}
                  tabIndex={pageTabIndex}
                />
              </form>
            </Filters>
          )}
          <TableStyles>
            <thead>
              <tr>
                <th>Job title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Department</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredVacancies.map((vacancy: VacancyType) => (
                <tr key={vacancy.Reference.toLowerCase()}>
                  <td>
                    <Link
                      tabIndex={pageTabIndex}
                      to={`/vacancy/${vacancy.Reference.toLowerCase()}`}
                      rel={'nofollow'}
                    >
                      {vacancy.VacancyName}
                    </Link>
                  </td>
                  <td>{vacancy.Location}</td>
                  <td>{vacancy.VacancyType}</td>
                  <td>{vacancy.Department}</td>
                  <td>
                    <ArrowLink
                      tabIndex={pageTabIndex}
                      to={`/vacancy/${vacancy.Reference.toLowerCase()}`}
                      rel={'nofollow'}
                    >
                      Apply
                      <ArrowIcon />
                    </ArrowLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </TableStyles>
        </>
      ) : (
        <p>No vacancies</p>
      )}
      {props.buttonLabel && (
        <Button
          tabIndex={pageTabIndex}
          label={props.buttonLabel}
          link={'/vacancies'}
        />
      )}
    </Section>
  )
}
VacancyList.defaultProps = {
  heading: '',
  subHeading: '',
  text: '',
  limit: 'all',
  filter: true,
}
export default VacancyList
