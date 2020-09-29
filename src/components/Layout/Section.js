import React from "react"
import styled from "styled-components"

const Section = styled.section`
  text-align: ${props => (props.center ? "center" : "left")};
  padding: 30px 0;
  h1,
  h2,
  h3 {
    color: ${props => props.theme.colors.headline};
  }
  p {
    color: #000;
  }

  // h2:after {
  //   left: 50%;
  //   z-index: 1;
  //   width: 40px;
  //   height: 2px;
  //   content: " ";
  //   top: 45px;
  //   margin-left: -20px;
  //   text-align: center;
  //   position: absolute;
  //   background: ${props => props.theme.colors.primary};
  // }
`
const DarkSection = styled(Section)`
  background-color: ${props => props.theme.colors.darkBackground};
  h1,
  h2,
  h3 {
    color: #fff;
  }
  p {
    color: ${props => props.theme.colors.text};
  }
`

const GreySection = styled(DarkSection)`
  background-color: ${props => props.theme.colors.grey80};
  p {
    color: ${props => props.theme.colors.text};
  }
`

const ClearSection = styled(Section)`
  background-color: ${props => props.theme.colors.grey20};
`

const Wrapper = props => {
  let MainSection = Section

  if (props.color === "dark") {
    MainSection = DarkSection
  } else if (props.color === "grey") {
    MainSection = GreySection
  } else if (props.color === "clear") {
    MainSection = ClearSection
  }

  return (
    <MainSection {...props} style={{ ...props.style }}>
      {props.children}
    </MainSection>
  )
}

export default Wrapper
