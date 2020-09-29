const path = require("path")

module.exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const pageTemplate = path.resolve(`./src/templates/page.js`)
  const blogTemplate = path.resolve(`./src/templates/blog.js`)
  const portfolioTemplate = path.resolve(`./src/templates/portfolio.js`)

  const response = await graphql(`
    query {
      allContentfulPortfolioItem {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulPage {
        edges {
          node {
            slug
          }
        }
      }
    }
  `)

  response.data.allContentfulPortfolioItem.edges.forEach(el => {
    createPage({
      component: portfolioTemplate,
      path: `/portfolio/${el.node.slug}`,
      context: {
        slug: el.node.slug,
      },
    })
  })

  response.data.allContentfulPage.edges.forEach(el => {
    createPage({
      component: pageTemplate,
      path: `/${el.node.slug}`,
      context: {
        slug: el.node.slug,
      },
    })
  })
}
