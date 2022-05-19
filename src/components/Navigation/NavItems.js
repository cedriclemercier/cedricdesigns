// The implementation of Subnav is uncomplete at the moment

import React from "react"
import styled from "styled-components"
import { device } from "../../styles/theme"

import NavItem from "./NavItem"

const NavItems = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  flex-flow: column;
  display: flex;
  justify-content: flex-end;
  height: 100%;

  //   When screen larger than 769, use row nav
  @media ${device.tablet} {
    flex-flow: row;
  }
`

// const SubNav = styled.div`
//   position: absolute;
//   background-color: ${props => props.theme.colors.purple};
//   border: 2px solid #fff;
//   color: #fff;
//   font-size: 15px;
//   top: 45px;
//   z-index: 15;

//   ul {
//     margin: 0;
//   }

//   li {
//     list-style: none;
//     min-width: 160px;
//   }
// `

// const SubLink = styled(Link)`
//   color: #fff;
//   text-decoration: none;
//   width: 100%;
//   display: block;
//   padding: 10px 20px;

//   :hover {
//     background-color: ${props => props.theme.colors.lightpurple};
//   }
// `

const Component = props => {
  return (
    <NavItems>
      <NavItem to="/" title="Home" />
      <NavItem to="/about" title="About" />
      <NavItem to="/services" title="Services" />
      <NavItem to="/portfolio" title="Portfolio" />
      <NavItem to="/contact" title="Contact" />
    </NavItems>
  )
}

export default Component
