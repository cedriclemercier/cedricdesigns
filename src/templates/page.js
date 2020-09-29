import React from "react"

import Layout from "@components/layout"
import SEO from "@components/seo"
import Image from "gatsby-image"
import { graphql, } from "gatsby"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"
import { Box } from "react-raster"

// My Custom Components
import PortfolioItem from "@components/portfolio/PortfolioItem.js"
import DefaultGrid from "@components/Layout/Grid"
import Softbox from "@components/UI/Softbox"
import Section from "@components/Layout/Section"
import ContactForm from "@components/contactform"

export const query = graphql`
  query($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      metaDescription {
        metaDescription
      }
      updatedAt(formatString: "MMMM Do, YYYY")
      body {
        json
      }
      slug
    }

    pages: allContentfulPage {
      edges {
        node {
          title
          contentful_id
          metaDescription {
            metaDescription
          }
          image {
            fixed(width: 80, quality: 90) {
              width
              ...GatsbyContentfulFixed
            }
          }
          slug
          body {
            json
          }
        }
      }
    }

    images: allContentfulAsset {
      edges {
        node {
          contentful_id
          fluid(maxWidth: 800, quality: 100) {
            base64
            ...GatsbyContentfulFluid
          }
          fixed(width: 500, quality: 100) {
            ...GatsbyContentfulFixed
          }
        }
      }
    }

    portfolio: allContentfulPortfolioItem {
      edges {
        node {
          contentful_id
          slug
          description {
            description
          }
          title
          skills {
            key
            value
          }
          colors {
            key
            value
          }

          thumbnail {
            title
            description
            fluid(quality: 100, maxWidth: 900) {
              ...GatsbyContentfulFluid
            }
            fixed(width: 800, resizingBehavior: CROP, quality: 90) {
              width
              src
              height
              aspectRatio
              ...GatsbyContentfulFixed
            }
          }
        }
      }
    }
  }
`

const Page = props => {
  // Check if the page has a meta description
  let meta
  if (props.data.contentfulPage.metaDescription) {
    meta = props.data.contentfulPage.metaDescription.metaDescription
  }

  // Check if the page has any embedded entries to see if needs to render some components
  const hasEmbeddedEntries = props.data.contentfulPage.body.json.content.find(
    el => el.nodeType === "embedded-entry-block"
  )

  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const contentful_id = node.data.target.sys.contentful_id
        const asset = props.data.images.edges.find(
          el => el.node.contentful_id === contentful_id
        )
        return (
          <div style={{ maxWidth: 600 }}>
            <Image fluid={asset.node.fluid} />
          </div>
        )
      },
    },
  }

  const portfolioOptions = {
    renderNode: {
      "embedded-entry-block": node => {
        const portfolioItemContentfulId = node.data.target.sys.contentful_id
        const portfolioPage = props.data.portfolio.edges.find(
          el => el.node.contentful_id === portfolioItemContentfulId
        )
        return (
          <>
            <PortfolioItem
              thumbnailFixed={portfolioPage.node.thumbnail.fixed}
              thumbnailFluid={portfolioPage.node.thumbnail.fluid}
              title={portfolioPage.node.title}
              description={portfolioPage.node.description.description}
              link={portfolioPage.node.slug}
              skills={portfolioPage.node.skills}
              colorPalette={portfolioPage.node.colors}
            />
          </>
        )
      },
    },
    renderText: text => {
      return null
    },
  }

  const pageOptions = {
    renderNode: {
      "embedded-entry-block": node => {
        const page_id = node.data.target.sys.contentful_id
        const page = props.data.pages.edges.find(
          el => el.node.contentful_id === page_id
        )
        return (
          <Box cols={[6, 6, 6, 4]}>
            <Softbox
              slug={page.node.slug}
              image={page.node.image.fixed}
              title={page.node.title}
              metaDescription={page.node.metaDescription.metaDescription}
            />
          </Box>
        )
      },
      [BLOCKS.UL_LIST]: null,
    },
    renderText: text => {
      return null
    },
  }

  return (
    <Layout isNormalPage={true}>
      <Section>
        <DefaultGrid>
          <Box cols={[12, 12, 12, 9]}>
            <SEO
              title={props.data.contentfulPage.title}
              description={meta ? meta : null}
            />
            <h1>{props.data.contentfulPage.title}</h1>
            {documentToReactComponents(
              props.data.contentfulPage.body.json,
              options
            )}
            {props.data.contentfulPage.slug === "portfolio" &&
              documentToReactComponents(
                props.data.contentfulPage.body.json,
                portfolioOptions
              )}
            {props.data.contentfulPage.slug !== "portfolio" &&
              hasEmbeddedEntries && (
                <DefaultGrid>
                  {documentToReactComponents(
                    props.data.contentfulPage.body.json,
                    pageOptions
                  )}
                </DefaultGrid>
              )}
          </Box>
        </DefaultGrid>
        {props.data.contentfulPage.slug === "contact" && (
          <DefaultGrid>
            <Box cols={[12, 12, 3, 3]}></Box>
            <Box cols={[12, 12, 9, 6]}>
              <ContactForm />
            </Box>
          </DefaultGrid>
        )}
      </Section>
    </Layout>
  )
}

export default Page
