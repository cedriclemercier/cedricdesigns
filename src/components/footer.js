import React from "react"
import styled from "styled-components"
import { Box } from "react-raster"

import Grid from "@components/Layout/Grid"
import Section from "@components/Layout/Section"
import { AiFillBehanceCircle, AiFillInstagram } from "react-icons/ai"

const Social = styled.div`
  svg {
    color: ${props => props.theme.colors.grey20};
  }
`

const Copyright = styled.div`
  background-color: #000;
  color: #fff;
  text-align: center;
`

const Wrapper = props => {
  return (
    <footer>
      <Section center color="grey">
        <Grid>
          <Box cols={12}>
            <h2>Contact Us</h2>
            <p>
              If you have some Questions or need Help! Please Contact Us! We
              make Cool and Clean Design for your Business
            </p>
          </Box>
        </Grid>
        <Grid>
          <Box cols={[12, 12, 3]}>
            <h3>Our Business Office</h3>
            <p>Melbourne, VIC 3000</p>
            <p>
              <a href="tel:(03) 9005 7154">(03) 9005 7154</a>
            </p>
            <p>info@cedricdesigns.com.au</p>
          </Box>
          <Box cols={[12, 12, 3]}>
            <h3>Business Hours</h3>
            <p>Saturday:9am to 5pm</p>
            <p>Weekdays:9am to 8pm</p>
            <p>Sunday:Closed</p>
          </Box>
          <Box cols={[12, 12, 3]}>
            <Social>
              <h3>Social Media Links</h3>
              <AiFillBehanceCircle style={{ fontSize: 36 }} />
              <AiFillInstagram style={{ fontSize: 36 }} />
            </Social>
          </Box>
        </Grid>
      </Section>
      <Copyright>
        <Grid>
          <Box cols={[6, 6, 4]}>
            <p>Copyright © {new Date().getFullYear()}, Cedric Designs</p>
          </Box>
        </Grid>
      </Copyright>
    </footer>
  )
}

export default Wrapper
