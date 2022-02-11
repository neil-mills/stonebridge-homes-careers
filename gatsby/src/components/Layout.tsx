import React, { FC, useContext } from 'react'
import GlobalStyles from '../assets/styles/Global'
import Typography from '../assets/styles/Typography'
import 'normalize.css'
import Helmet from 'react-helmet'
import Header from './Header'
import MobileNav from './MobileNav'
import Footer from './Footer'
import AppContext from '../context/AppContext'
import Dialog from '../components/Dialog'
import { useStaticQuery, graphql } from 'gatsby'
import { NavigationLink } from '../types/navigation'

interface PageProps {
  seoTitle: string
  seoDescription: string
}
interface LayoutProps {
  data: {
    pages: { nodes: PageProps[] }
  }
}
const Layout: FC<LayoutProps> = ({ data, children }) => {
  const { bodyNoScroll, dialogContent } = useContext(AppContext)
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
      <Helmet bodyAttributes={{ 'data-noscroll': bodyNoScroll }}>
        <title>{data.pages.nodes[0].seoTitle}</title>
        <meta name="description" content={data.pages.nodes[0].seoDescription} />
      </Helmet>
      <Dialog centred={true}>{dialogContent}</Dialog>
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
