import React from "react"
import { graphql, Link } from "gatsby"
import Image from "gatsby-image"
import { Box } from "react-raster"
import styled from "styled-components"
import { IoIosArrowRoundBack } from "react-icons/io"

import Section from "@components/Layout/Section"
import Layout from "@components/layout"
import SEO from "@components/seo"
import DefaultGrid from "@components/Layout/Grid"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { MARKS, BLOCKS } from "@contentful/rich-text-types"

export const query = graphql`
  query($slug: String!) {
    contentfulPortfolioItem(slug: { eq: $slug }) {
      title
      updatedAt(formatString: "MMMM Do, YYYY")
      slug
      body {
        json
      }
      skills {
        key
        value
      }
      colors {
        key
        value
      }
    }

    images: allContentfulAsset(filter: {}) {
      edges {
        node {
          contentful_id
          title
          description
          fluid(quality: 100, maxWidth: 800) {
            base64
            ...GatsbyContentfulFluid
          }
          fixed(quality: 100, width: 600) {
            base64
            ...GatsbyContentfulFixed
          }
        }
      }
    }
  }
`

const createAnchor = text => {
  // TODO REMOVE ALL REMAINING SPECIAL CHARACTERS
  return text.toString().toLowerCase().replace(/-/g, "").replace(/\s+/g, "-")
}

const Page = props => {
  const bodyOptions = {
    renderMark: {
      [MARKS.CODE]: node => {
        return <div dangerouslySetInnerHTML={{ __html: node }} />
      },
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        const { contentful_id } = node.data.target.sys
        const image = props.data.images.edges.find(
          el => el.node.contentful_id === contentful_id
        )
        return (
          <Image
            fluid={image.node.fluid}
            alt={image.node.description}
            style={{ marginBottom: 20 }}
          />
        )
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return <h2 id={createAnchor(children)}>{children}</h2>
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return <h3 id={createAnchor(children)}>{children}</h3>
      },
    },
  }

  const anchorOptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (node, children) => {
        return null;
      },
      [BLOCKS.HEADING_2]: (node, children) => {
        return (
          <li>
            <a href={createAnchor(`#${children}`)}>{children}</a>
          </li>
        )
      },
      [BLOCKS.HEADING_3]: (node, children) => {
        return (
          <li>
            <a style={{ fontSize: 16 }} href={createAnchor(`#${children}`)}>
              - {children}
            </a>
          </li>
        )
      },
      [BLOCKS.PARAGRAPH]: (node, children) => {
        return null
      },
      [BLOCKS.UL_LIST]: (node, children) => {
        return null
      },
    },
  }

  return (
    <Layout isNormalPage={true}>
      <SEO title="Portfolio Item" />
      <Section>
        <DefaultGrid center>
          <Box cols={(12, 12, 9, 9, 8)}>
            <Link to="/">
              <IoIosArrowRoundBack style={{ marginRight: 5 }} />
              Back
            </Link>
          </Box>
        </DefaultGrid>
        <DefaultGrid>
          <Box cols={[12, 12, 4, 3, 3]}>
            <List>
              <ul>
                {documentToReactComponents(
                  props.data.contentfulPortfolioItem.body.json,
                  anchorOptions
                )}
              </ul>
            </List>
          </Box>
          <Box cols={[12, 12, 8, 6, 5]}>
            {documentToReactComponents(
              props.data.contentfulPortfolioItem.body.json,
              bodyOptions
            )}
          </Box>
        </DefaultGrid>
      </Section>
    </Layout>
  )
}

const List = styled.div`
  background-color: ${props => props.theme.colors.grey20};

  ul {
    margin: 0;
  }

  a {
    transition: all 300ms;
    width: 100%;
    height: 100%;
    display: block;
    padding: 20px 40px;
    text-decoration: none;

    :hover {
      background-color: ${props => props.theme.colors.accent};
      color: #fff;
    }
  }

  li {
    position: relative;
    list-style: none;
    width: 100%;
    margin: 0;
  }
`

export default Page
