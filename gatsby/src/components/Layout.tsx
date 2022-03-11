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
import { VacancyType, ArticleType } from '../types'

interface PageProps {
  seoTitle: string
  seoDescription: string
}
interface LayoutProps {
  data: {
    pages?: { nodes: PageProps[] }
    vacancy?: VacancyType
    article?: ArticleType
  }
}
const Layout: FC<LayoutProps> = ({ data, children }) => {
  const { bodyNoScroll, dialogContent, pageTitle } = useContext(AppContext)
  let title = pageTitle
  let desc = ''
  if (data?.pages) {
    title = data?.pages?.nodes[0]?.seoTitle
    desc = data?.pages?.nodes[0]?.seoDescription
  }
  if (data?.vacancy) {
    title = data.vacancy.VacancyName
    desc = data.vacancy.VacancyDescription
  }
  if (data?.article) {
    title = data.article.title
    desc = ''
  }
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
        <link
          rel="icon"
          type="image/png"
          href="https://stonebridgehomes.co.uk/_protected/logo-emblem.png"
        />
        <title>{title}</title>
        <meta name="description" content={desc} />
        <meta property="og:locale" content="en_GB" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Careers in Yorkshire with Stonebridge Homes"
        />
        <meta
          property="og:description"
          content="There has never been a more exciting time to join the house building industry or Stonebridge as we embark on our ambitious growth plan to become a multi-regional house builder."
        />
        <meta
          property="og:url"
          content="https://careers.stonebridgehomes.co.uk/"
        />
        <meta property="og:site_name" content="Stonebridge Homes Careers" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:description"
          content="There has never been a more exciting time to join the house building industry or Stonebridge as we embark on our ambitious growth plan to become a multi-regional house builder."
        />
        <meta
          name="twitter:title"
          content="Careers in Yorkshire with Stonebridge Homes"
        />
        <meta name="twitter:site" content="@StonebridgeHome" />
        <meta name="twitter:creator" content="@StonebridgeHome" />
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
