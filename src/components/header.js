import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import PropTypes from "prop-types"
import styled from "styled-components"
import { IoMdMenu } from "react-icons/io"
import Grid from "@components/Layout/Grid"
import { Box } from "react-raster"
import Img from "gatsby-image"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { MARKS, BLOCKS, INLINES } from "@contentful/rich-text-types"

import NavItems from "./Navigation/NavItems"
import Sidebar from "./Navigation/Sidebar"
import MegaButton from "@components/UI/MegaButton"

const Wrapper = props => {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(false)

  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "bg-01.png" }) {
        childImageSharp {
          fluid(maxWidth: 1920) {
            aspectRatio
            base64
            sizes
            src
            ...GatsbyImageSharpFluid
          }
        }
      }
      logo: file(relativePath: { eq: "fav-icon.png" }) {
        childImageSharp {
          fixed(width: 70, height: 70) {
            width
            height
            ...GatsbyImageSharpFixed
          }
        }
      }

      rocket: file(relativePath: { eq: "rocket.png" }) {
        childImageSharp {
          fixed(height: 700) {
            height
            ...GatsbyImageSharpFixed
          }
        }
      }

      homepage: contentfulHomePage {
        cta {
          json
        }
      }

      pages: allContentfulPage {
        edges {
          node {
            contentful_id
            slug
          }
        }
      }
    }
  `)

  const sidebarToggleHandler = () => {
    setSidebarIsOpen(!sidebarIsOpen)
  }

  const sidebarCloseHandler = () => {
    setSidebarIsOpen(false)
  }

  let header = (
    <HeaderImg isNormalPage={props.isNormalPage}>
      <Img fluid={data.background.childImageSharp.fluid} />
    </HeaderImg>
  )

  let isFirstLink = true
  const ctaOptions = {
    renderMark: {
      [MARKS.BOLD]: text => <strong>{text}</strong>,
    },
    renderNode: {
      [BLOCKS.HEADING_2]: (node, children) => (
        <h2 style={{ fontSize: 59 }}>{children}</h2>
      ),
      [INLINES.ENTRY_HYPERLINK]: node => {
        const { contentful_id } = node.data.target.sys
        const pageLink = data.pages.edges.find(
          el => el.node.contentful_id === contentful_id
        )
        let button = (
          <MegaButton mode={!isFirstLink && "outline"} to={pageLink.node.slug}>
            {node.content[0].value}
          </MegaButton>
        )
        isFirstLink = false
        return button
      },
    },
  }

  if (!props.isNormalPage) {
    header = (
      <>
        <Header>
          <Grid alignY="center" style={`height: 100%`}>
            <Box cols={[12, 12, 8, 5]}>
              {documentToReactComponents(data.homepage.cta.json, ctaOptions)}
            </Box>
            <Box cols={[12, 12, 4, 4]}></Box>
          </Grid>
        </Header>

        <RocketImg>
          <Img fixed={data.rocket.childImageSharp.fixed} />
        </RocketImg>
        <HeaderImg>
          <Img fluid={data.background.childImageSharp.fluid} />
        </HeaderImg>
      </>
    )
  }

  return (
    <HeaderContainer isNormalPage={props.isNormalPage}>
      <Backdrop
        backdropOpen={sidebarIsOpen}
        onClick={sidebarCloseHandler}
        onKeyDown={sidebarCloseHandler}
        role="presentation"
      />
      <header>
        <Grid>
          <Box cols={[12, 12, 5, 3]}>
            <Link to="/">
              <Img fixed={data.logo.childImageSharp.fixed} />
            </Link>
            <Menu>
              <IoMdMenu
                onClick={sidebarToggleHandler}
                color="white"
                style={{
                  fontSize: 36,
                  cursor: "pointer",
                  textAlign: "right",
                }}
              />
            </Menu>
          </Box>
          <Box cols={[12, 12, 7, 6]}>
            <NavDesktopContainer>
              <NavItems />
            </NavDesktopContainer>
          </Box>
        </Grid>
        <Sidebar open={sidebarIsOpen} />
      </header>
      {header}
      <Bg />
    </HeaderContainer>
  )
}

Wrapper.propTypes = {
  siteTitle: PropTypes.string,
}

Wrapper.defaultProps = {
  siteTitle: ``,
}

export default Wrapper

// Styling
const NavDesktopContainer = styled.nav`
  @media (max-width: 768px) {
    display: none;
  }
`

const HeaderContainer = styled.div`
  background-size: cover;
  background-repeat: no-repeat;
  height: ${props => (props.isNormalPage ? "20vh" : "100vh")};
  // ${props => props.isNormalPage && "overflow: hidden"};
  position: relative;

  @media (min-width: 768px) {
    background-position-x: 10vw;
    background-size: cover;
  }
`

const HeaderImg = styled.div`
  position: ${props => (!props.isNormalPage ? "fixed" : "absolute")};
  top: 0;
  z-index: -1;
  width: 100%;
  overflow: hidden;
`

const Header = styled.div`
  span {
    color: ${props => props.theme.colors.accent};
  }
  margin-top: 30px;

  strong {
    color: ${props => props.theme.colors.accent};
  }

  @media ${props => props.theme.device.mobileL} {
    margin-top: 0;
  }

  height: 70%;
`

const Menu = styled.div`
  padding-top: 30px;
  padding-right: 30px;
  padding-left: 30px;
  position: absolute;
  top: 0;
  z-index: 10;
  right: 0;
  @media (min-width: 769px) {
    display: none;
  }
`

const Bg = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -11;
  background-color: #fff;
  top: 0;
`

const RocketImg = styled.div`
  position: absolute;
  z-index: 10;
  left: 56%;
  top: 260px;
  display: none;

  @media ${props => props.theme.device.tablet} {
    display: block;
  }
`

const Backdrop = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.75);
  transition: all 400ms;

  visibility: ${props => (props.backdropOpen ? "visible" : "hidden")};
  opacity: ${props => (props.backdropOpen ? "1" : "0")};
`
