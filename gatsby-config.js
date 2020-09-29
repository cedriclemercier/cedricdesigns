const path = require("path")

module.exports = {
  siteMetadata: {
    title: `Cedric Designs Portfolio`,
    description: `A Full Stack Web Designer and Developer Portfolio`,
    author: `@gatsbyjs`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@UI": path.resolve(__dirname, "src/components/UI"),
          "@styles": path.resolve(__dirname, "src/styles"),
          "@pages": path.resolve(__dirname, "src/pages"),
        },
        extensions: ["js"],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `cedric-designs`,
        short_name: `gatsby`,
        start_url: `/`,
        background_color: `##FF1734`,
        theme_color: `##FF1734`,
        display: `minimal-ui`,
        icon: `src/images/fav-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
