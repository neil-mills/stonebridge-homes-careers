import React, { FC } from 'react'
import { graphql } from 'gatsby'
import { VacancyType } from '../types'

const SingleVacancyPage: FC = ({ data }) => {
  return <div>Vacancy</div>
}

export const query = graphql`
  query ($id: String!) {
    vacancy: vacancy(id: { eq: $id }) {
      id
      City
      ClosingDate
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
export default SingleVacancyPage
