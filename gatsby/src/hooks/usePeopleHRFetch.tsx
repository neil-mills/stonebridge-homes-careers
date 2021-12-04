import { setState, useState } from 'react'
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
    let jsonData = {
      APIKey: process.env.APIKEY,
      Action: action,
    }
    if (data) {
      jsonData = { ...jsonData, ...data }
    }
    console.log(jsonData)
    try {
      console.log(`sending ${action} request`)
      const res = await fetch(`https://api.peoplehr.net/${dir}/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/json',
        },
        body: JSON.stringify(jsonData),
      })
      const jsonResponse = await res.json()
      console.log(`${action} response recieved`)
      return jsonResponse
    } catch (err) {
      return 'Error'
    }
  }

  return [makeRequest, isLoading]
}
