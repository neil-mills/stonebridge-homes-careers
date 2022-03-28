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
    {
      resolve: 'gatsby-plugin-styled-components',
      options: {
        displayName: false,
        minify: true,
        ssr: true,
      },
    },
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '3nbpuff1',
        dataset: 'production',
        watchMode: true,
        token: process.env.SANITYTOKEN,
      },
    },
    {
      resolve: 'gatsby-plugin-google-gtag',
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [
          'G-FE8RY0LJL5', // Google Analytics / GA
          // "AW-CONVERSION_ID", // Google Ads / Adwords / AW
          // "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
        ],
        // This object gets passed directly to the gtag config command
        // This config will be shared across all trackingIds
        // gtagConfig: {
        //   optimize_id: "OPT_CONTAINER_ID",
        //   anonymize_ip: true,
        //   cookie_expires: 0,
        // },
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
          // Setting this parameter is also optional
          // respectDNT: true,
          // Avoids sending pageview hits from custom paths
          // exclude: ["/preview/**", "/do-not-track/me/too/"],
          // Defaults to https://www.googletagmanager.com
          // origin: "YOUR_SELF_HOSTED_ORIGIN",
        },
      },
    },
  ],
}

module.exports = defaultConfig
