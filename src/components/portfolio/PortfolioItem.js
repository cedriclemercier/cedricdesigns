import React from "react"
import styled from "styled-components"
import Image from "gatsby-image"
import { Link } from "gatsby"
import { Grid, Box } from "react-raster"

// custom components
import ProgressBar from "@components/UI/ProgressBar"

const PortfolioItem = styled.div`
  margin-bottom: 30px;
`

const PortfolioDescription = styled.div`
  text-align: left;
  padding: 0 20px 20px 20px;

  a {
    text-decoration: none;
    color: ${props => props.theme.colors.primary};
    transition: all 400ms;

    :after {
      left: 0;
      transition: all 200ms;
      bottom: -10px;
      z-index: 1;
      width: 70px;
      height: 2px;
      content: " ";
      position: absolute;
      background: transparent;
    }
  }

  h2 {
    position: relative;
    :after {
      display: none;
    }
  }

  a:hover {
    color: ${props => props.theme.colors.accent};

    :after {
      background: ${props => props.theme.colors.primary};
    }
  }
`

const ColorPalette = styled.div`
  height: 30px;
  width: 30px;
  background-color: ${props => props.color};
  margin-right: 10px;
  float: left;
`

const ProjectComponents = styled.div`
  margin-top: 10px;
  margin-bottom: 20px;

  h1,
  h2,
  h3,
  h4,
  h5 {
    margin: 2px;
  }
`

const Wrapper = props => {
  return (
    <PortfolioItem>
      <Grid alignX="center" breakpoints={[0, 400, 768, 1200]} colspan={12}>
        <Box cols={[12, 12, 8, 7]}>
          <Link to={props.link}>
            {/* <Image fixed={props.thumbnailFixed} /> */}
            <Image fluid={props.thumbnailFluid} />
          </Link>
        </Box>
        <Box cols={[12, 12, 4, 4]}>
          <PortfolioDescription>
            <h2>
              <Link to={props.link}>{props.title}</Link>
            </h2>
            <p>{props.description}</p>
            <h4>Project Components</h4>
            {props.skills.map(el => (
              <ProjectComponents>
                <h5>{el.key}</h5>
                <ProgressBar percentage={el.value} />
              </ProjectComponents>
            ))}

            <h4>Colour Palette</h4>
            <ProjectComponents>
              <div style={{ display: "inline-block" }}>
                {props.colorPalette.map(el => (
                  <ColorPalette color={el.value} />
                ))}
              </div>
            </ProjectComponents>
            <h4>Typography</h4>
          </PortfolioDescription>
        </Box>
      </Grid>
      <Image />
      {props.children}
    </PortfolioItem>
  )
}

export default Wrapper
