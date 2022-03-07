const React = require('react')
const Layout = require('./src/components/Layout')
const { AppContextProvider } = require('./src/context/AppContext')

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
}

export const wrapRootElement = ({ element }) => {
  return <AppContextProvider>{element}</AppContextProvider>
}
