import React from "react"
import styled from "styled-components"

import NavItems from "./NavItems"

const Sidebar = styled.div`
  position: fixed;
  width: 280px;
  max-width: 70%;
  right: 0;
  z-index: 1;
  background-color: red; /* For browsers that do not support gradients */
  background-image: linear-gradient(
    45deg,
    #1c0148,
    #080027
  ); /* Standard syntax (must be last) */
  padding-top: 100px;
  padding-left: 16px;
  padding-right: 16px;
  transition: transform 0.3s ease-out;
  margin-top: -20px;
  box-shadow: 5px 0 10px 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  top: 0;
  bottom: 0;
  transform: ${props => (props.open ? "translateX(0)" : "translateX(100%)")};
  @media ${props => props.theme.device.tablet} {
    display: none;
  }
`

const Component = props => {
  return (
    <Sidebar open={props.open}>
      <div style={{ textAlign: "right" }}>
        {" "}
        {/* <IoIosClose
                      style={{
                        fontSize: 36,
                        cursor: "pointer",
                        textAlign: "right",
                      }}
                    /> */}{" "}
      </div>{" "}
      <nav>
        <NavItems />
      </nav>{" "}
    </Sidebar>
  )
}

export default Component
