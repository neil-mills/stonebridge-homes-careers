import React, { FC, useContext } from 'react'
import GlobalStyles from '../assets/styles/Global'
import Typography from '../assets/styles/Typography'
import 'normalize.css'
import Helmet from 'react-helmet'
import Header from './Header'
import MobileNav from './MobileNav'
import Footer from './Footer'
import AppContext from '../context/AppContext'

const Layout: FC = ({ children }) => {
  const { bodyNoScroll } = useContext(AppContext)
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Helmet bodyAttributes={{ 'data-noscroll': bodyNoScroll }} />
      <Header />
      <MobileNav />
      <main id="main">
        <div id="content">{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Layout
