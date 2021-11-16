import React, { FC, useContext, useState } from 'react'
import GlobalStyles from '../assets/styles/Global'
import Typography from '../assets/styles/Typography'
import 'normalize.css'
import Helmet from 'react-helmet'
import Header from './Header'
import MobileNav from './MobileNav'
import Footer from './Footer'
import AppContext from '../context/AppContext'
import { useStaticQuery, graphql } from 'gatsby'
import { NavigationLink } from '../types/navigation'

const Layout: FC = ({ children }) => {
  const { bodyNoScroll } = useContext(AppContext)

  const { menus } = useStaticQuery(graphql`
    query {
      menus: allSanityNavigation {
        nodes {
          id
          title
          navigationLink {
            ... on SanityPage {
              id
              title
              slug {
                current
              }
            }
          }
        }
      }
    }
  `)
  const headerNav: NavigationLink[] = menus.nodes.find(
    (menu: NavigationLink) => menu.title === 'Header'
  ).navigationLink
  const footerNav: NavigationLink[] = menus.nodes.find(
    (menu: NavigationLink) => menu.title === 'Footer'
  ).navigationLink
  return (
    <>
      <GlobalStyles />
      <Typography />
      <Helmet bodyAttributes={{ 'data-noscroll': bodyNoScroll }} />
      <Header navOptions={headerNav} />
      <MobileNav />
      <main id="main">
        <div id="content">{children}</div>
      </main>
      <Footer navOptions={footerNav} />
    </>
  )
}

export default Layout
