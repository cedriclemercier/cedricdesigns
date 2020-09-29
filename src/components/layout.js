/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { ThemeProvider } from "styled-components"
import styled from "styled-components"
import * as theme from "@styles/theme"

import Header from "./header"
import Footer from "@components/footer"
import "./layout.scss"

const Body = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Layout = ({ children, isNormalPage }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <ThemeProvider theme={theme}>
      <Body>
        <div style={{ flexGrow: 1 }}>
          <Header
            siteTitle={data.site.siteMetadata.title}
            isNormalPage={isNormalPage ? isNormalPage : null}
          />
          <main style={{ backgroundColor: "#fff" }}>{children}</main>
        </div>
        <Footer />
      </Body>
    </ThemeProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
