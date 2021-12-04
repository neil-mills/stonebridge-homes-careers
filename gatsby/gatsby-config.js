require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const defaultConfig = {
  siteMetadata: {
    title: 'Stonebridge Homes Careers',
    siteUrl: 'http://careers.stonebridgehomes.co.uk',
    description: 'Careers',
    author: 'Neil Mills',
  },
  plugins: [
    'gatsby-plugin-typescript',
    'gatsby-plugin-react-svg',
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '3nbpuff1',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITYTOKEN,
      },
    },
  ],
}

module.exports = defaultConfig
