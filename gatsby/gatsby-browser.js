import React from 'react'
import Layout from './src/components/Layout'
import { DialogContextProvider } from './src/context/DialogContext'
import { MenuContextProvider } from './src/context/MenuContext'

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const wrapRootElement = ({ element }) => {
  return (
    <MenuContextProvider>
      <DialogContextProvider>{element}</DialogContextProvider>
    </MenuContextProvider>
  )
}
