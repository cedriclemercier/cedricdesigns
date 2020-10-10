import React from "react"
import { Box } from "react-raster"
import DefaultGrid from "@components/Layout/Grid"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { INLINES, BLOCKS } from "@contentful/rich-text-types"

import Section from "@components/Layout/Section"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PortfolioItem from "@components/portfolio/PortfolioItem"
import ContactForm from "@components/contactform"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query {
      homepage: contentfulHomePage {
        slug
        cta {
          json
        }
        services {
          json
        }
        body {
          json
        }
        backgroundHeader {
          fluid(maxWidth: 1920, quality: 100) {
            base64
            tracedSVG
            srcWebp
            srcSetWebp
          }
        }
      }

      serviceIcons: allContentfulIconBox(filter: { key: { eq: "Service" } }) {
        edges {
          node {
            contentful_id
            title
            key
            description {
              description
            }
            image {
              fixed(quality: 100, width: 150) {
                base64
                tracedSVG
                aspectRatio
                srcWebp
                srcSetWebp
                ...GatsbyContentfulFixed
              }
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
                base64
                tracedSVG
                srcWebp
                srcSetWebp
                ...GatsbyContentfulFluid
              }
            }
          }
        }
      }
    }
  `)

  let i = 0

  const servicesSectionOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return <></>
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <></>
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <></>
      },
      [BLOCKS.EMBEDDED_ENTRY]: node => {
        const { contentful_id } = node.data.target.sys
        const serviceLink = data.serviceIcons.edges.find(
          el => el.node.contentful_id === contentful_id
        )
        return (
          <Box cols={[12, 12, 3]}>
            <Service key={(i += 1)}>
              <span>
                <Image fixed={serviceLink.node.image.fixed} />
              </span>
              <h3>{serviceLink.node.title}</h3>
              <p>{serviceLink.node.description.description}</p>
            </Service>
          </Box>
        )
      },
    },
  }

  const paragraphOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: node => {
        return
      },
    },
  }

  const portfolioItemOptions = {
    renderNode: {
      "embedded-entry-block": node => {
        const portfolioItemContentfulId = node.data.target.sys.contentful_id
        const portfolioPage = data.portfolio.edges.find(
          el => el.node.contentful_id === portfolioItemContentfulId
        )
        return (
          <>
            <PortfolioItem
              // thumbnailFixed={portfolioPage.node.thumbnail.fixed}
              thumbnailFluid={portfolioPage.node.thumbnail.fluid}
              title={portfolioPage.node.title}
              description={portfolioPage.node.description.description}
              link={`/portfolio/${portfolioPage.node.slug}`}
              skills={portfolioPage.node.skills}
              colorPalette={portfolioPage.node.colors}
            />
          </>
        )
      },
    },
  }

  return (
    <Layout isNormalPage={false}>
      <SEO title="Home" />

      <Section color="dark" center>
        <DefaultGrid>
          <Box cols={[12, 12, 9]}>
            {documentToReactComponents(
              data.homepage.services.json,
              paragraphOptions
            )}

            <DefaultGrid>
              {documentToReactComponents(
                data.homepage.services.json,
                servicesSectionOptions
              )}
            </DefaultGrid>
          </Box>
        </DefaultGrid>
      </Section>

      <Section center>
        <DefaultGrid>
          <Box cols={[12, 12, 9]}>
            {documentToReactComponents(
              data.homepage.body.json,
              portfolioItemOptions
            )}
          </Box>
        </DefaultGrid>
      </Section>
      <Section center color="clear">
        <DefaultGrid>
          <Box cols={[12, 12, 9, 7]}>
            <h2>GET IN TOUCH</h2>
            <p>
              Have a question or request? Leave a message and I'll get back to
              you.
            </p>
            <ContactForm name="Homepage - Contact Form" />
          </Box>
        </DefaultGrid>
      </Section>
    </Layout>
  )
}

const Service = styled.div`
  text-align: center;

  span {
    padding: 60px 0px;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.accent};
  }

  span div {
    width: 150px;
    vertical-align: middle;
    border-style: none;
  }

  img {
    width: 150px;
    vertical-align: middle;
    border-style: none;
  }
`

export default IndexPage
