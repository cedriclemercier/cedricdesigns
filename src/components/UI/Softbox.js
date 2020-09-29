import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import Image from "gatsby-image"

const Wrapper = props => {
  return (
    <ServiceLink to={`/${props.slug}`}>
      <div>
        <Image fixed={props.image} />
        <h2>{props.title}</h2>
        <p>{props.metaDescription && props.metaDescription}</p>
      </div>
    </ServiceLink>
  )
}

const ServiceLink = styled(Link)`
  text-decoration: none;

  h2:after {
    background: transparent;
    transition: all 300ms;
    left: 50%;
    z-index: 1;
    width: 40px;
    height: 2px;
    content: " ";
    top: 170px;
    margin-left: -20px;
    text-align: center;
    position: absolute;
  }

  :hover h2:after {
    background: #ff1734;
  }

  > div {
    transition: all 300ms;
    box-shadow: 7px 7px 15px ${props => props.theme.colors.grey50};
    text-align: center;
    padding: 40px;
    border-radius: 4px;

    p {
      color: ${props => props.theme.colors.grey80};
    }
  }

  :hover > div {
    box-shadow: 7px 7px 15px ${props => props.theme.colors.grey60};
  }
`

export default Wrapper
