import React, { FC } from 'react'
import Section from './Section'
import { Link, useStaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import Select from '../components/Select'
import { HeadingStyle, FontMedium } from '../assets/styles/Typography'
import { GoldLink } from '../assets/styles/Utils'
import ArrowIcon from '../assets/svg/arrow-icon.svg'
import { VacancyType } from '../types'
import Heading from './Heading'
import Button from './Button'

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
  gap: 2rem;
  form {
    display: grid;
    gap: 1rem;
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
    gap: 0;
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

const VacancyList: FC<Props> = props => {
  const { vacancies } = useStaticQuery(graphql`
    query {
      vacancies: allVacancy {
        nodes {
          City
          ClosingDate
          Company
          Country
          Department
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
    }
  `)

  const filteredVacancies: VacancyType[] =
    props.limit !== 'all'
      ? vacancies.nodes.filter(
          (vacancy: VacancyType, i: number) => i < parseInt(props.limit)
        )
      : vacancies.nodes

  return (
    <Section tint={true}>
      {props.heading && (
        <Heading
          heading={props.heading}
          subHeading={props.subHeading}
          text={props.text}
        />
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
                <Select label={'Location'} />
                <Select label={'Sector'} />
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
                <tr key={vacancy.id}>
                  <td>
                    <Link to={`/vacancy/${vacancy.id}`}>
                      {vacancy.VacancyName}
                    </Link>
                  </td>
                  <td>{vacancy.Location}</td>
                  <td>{vacancy.VacancyType}</td>
                  <td>{vacancy.Department}</td>
                  <td>
                    <ArrowLink to={`/vacancy/${vacancy.id}`}>
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
        <Button label={props.buttonLabel} link={'/vacancies'} />
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
