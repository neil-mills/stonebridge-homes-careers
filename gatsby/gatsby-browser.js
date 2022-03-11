import React from 'react'
import Layout from './src/components/Layout'
import { AppContextProvider } from './src/context/AppContext'
import GlobalStyles from './src/assets/styles/Global'
import Typography from './src/assets/styles/Typography'

export const wrapRootElement = ({ element }) => {
  return <AppContextProvider>{element}</AppContextProvider>
}

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Layout {...props}>{element}</Layout>
    </>
  )
}
