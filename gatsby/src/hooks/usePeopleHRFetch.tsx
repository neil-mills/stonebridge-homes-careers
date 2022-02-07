import { useState } from 'react'
import { ApplicantData, ResponseType } from '../types'
export function usePeopleHRFetch<S>(
  action: string,
  data?: ApplicantData
): [() => Promise<ResponseType<S> | string>, boolean] {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const dir = [
    'CreateNewApplicant',
    'CheckDuplicateApplicant',
    'uploadapplicantdocument',
  ].includes(action)
    ? 'Applicant'
    : 'Vacancy'

  const makeRequest = async (): Promise<ResponseType<S> | string> => {
    console.log('API KEY=', process.env.APIKEY)
    console.log('G API KEY=', process.env.GATSBY_APIKEY)
    let jsonData = {
      APIKey: process.env.APIKEY,
      Action: action,
    }
    if (data) {
      jsonData = { ...jsonData, ...data }
    }
    try {
      setIsLoading(true)
      const res = await fetch(`https://api.peoplehr.net/${dir}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/json',
        },
        body: JSON.stringify(jsonData),
      })
      const jsonResponse = await res.json()
      setIsLoading(false)
      return jsonResponse
    } catch (err) {
      setIsLoading(false)
      return 'Error'
    }
  }

  return [makeRequest, isLoading]
}
