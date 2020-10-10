import React from "react"
import { Link } from "gatsby"
import styled from "styled-components"

const MegaButton = props => {
  return (
    <Button mode={props.mode ? props.mode : "fill"} to={props.to}>
      {props.children}
    </Button>
  )
}

const Button = styled(Link)`
  color: ${props =>
    props.mode !== "outline" ? "white" : props.theme.colors.primary};
  background-color: ${props =>
    props.mode === "outline" ? "transparent" : props.theme.colors.primary};
  border: 1px solid ${props => props.theme.colors.primary};
  font-family: open sans, sans-serif;
  text-transform: uppercase;
  font-weight: 700;
  border-radius: 2px;
  letter-spacing: 2px;
  font-size: 16px;
  padding: 17px 45px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
  transition: all 300ms;
  text-decoration: none;

  :hover {
    transform: translateY(-5px);
    background-color: ${props =>
      props.mode === "outline" ? "transparent" : props.theme.colors.accent};
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }
`

export default MegaButton
