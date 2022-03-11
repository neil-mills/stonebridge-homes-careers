import React from 'react'
import Layout from './src/components/Layout'
import GlobalStyles from './src/assets/styles/Global'
import Typography from './src/assets/styles/Typography'

export const wrapPageElement = ({ element, props }) => {
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Layout {...props}>{element}</Layout>
    </>
  )
}
