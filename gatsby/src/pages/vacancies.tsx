import React, { FC } from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import ImageBanner from '../components/ImageBanner'
import Banner from '../assets/images/vacancies-banner.jpg'
import BannerLg from '../assets/images/vacancies-banner-lg.jpg'
import Section from '../components/Section'
import { HeadingStyle, FontMedium } from '../assets/styles/Typography'
import { GoldLink } from '../assets/styles/Utils'
import ArrowIcon from '../assets/svg/arrow-icon.svg'
import Select from '../components/Select'
import Quotes from '../components/Quotes'

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

const VacanciesPage: FC = (): JSX.Element => {
  return (
    <>
      <ImageBanner
        src={Banner}
        srcLarge={BannerLg}
        heading={'Vacancies'}
        text={
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Egestas sodales aliquam justo, ut molestie elit Lorem ipsum dolor '
        }
        alignText={'left'}
        top={true}
        tint={true}
      />
      <Section tint={true}>
        <Filters>
          <h3>4 Vacancies</h3>
          <form>
            <Select label={'Location'} />
            <Select label={'Sector'} />
          </form>
        </Filters>
        <TableStyles>
          <thead>
            <tr>
              <th>Role</th>
              <th>Location</th>
              <th>Type</th>
              <th>Sector</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <Link to={'/vacancy'}>Marketing Manager</Link>
              </td>
              <td>Leeds</td>
              <td>Full time</td>
              <td>Marketing</td>
              <td>
                <ArrowLink to={'/vacancy'}>
                  Apply
                  <ArrowIcon />
                </ArrowLink>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={'/vacancy'}>Marketing Manager</Link>
              </td>
              <td>Leeds</td>
              <td>Full time</td>
              <td>Sales</td>
              <td>
                <ArrowLink to="/vacancy">
                  Apply
                  <ArrowIcon />
                </ArrowLink>
              </td>
            </tr>
            <tr>
              <td>
                <Link to={'/vacancy'}>Marketing Manager</Link>
              </td>
              <td>Leeds</td>
              <td>Contract</td>
              <td>Marketing</td>
              <td>
                <ArrowLink to={'/vacancy'}>
                  Apply
                  <ArrowIcon />
                </ArrowLink>
              </td>
            </tr>
          </tbody>
        </TableStyles>
      </Section>
      <Quotes />
    </>
  )
}

export default VacanciesPage
