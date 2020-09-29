import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"
import { IoIosArrowDown } from "react-icons/io"

const NavItem = styled.li`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  box-sizing: border-box;
  position: relative;
  cursor: pointer;
  margin-bottom: 0;
  position: relative;

  div {
    // visibility: hidden;
    opacity: 0;
    transition: all 300ms;
  }

  :hover {
    div {
      // visibility: visible;
      opacity: 1;
    }
  }
`

const Nav = styled(Link)`
  padding: 10px 0;
  text-decoration: none;
  color: ${props => props.theme.colors.grey20};
  height: 100%;
  font-size: 16px;
  display: flex;
  align-items: center;
`

const Component = props => {
  return (
    <NavItem>
      <Nav to={props.to}>
        {props.title}
        {props.hasSubnav && <IoIosArrowDown style={{ marginLeft: 5 }} />}
      </Nav>
      {props.children}
    </NavItem>
  )
}

export default Component
