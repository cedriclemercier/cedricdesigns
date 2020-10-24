import React from "react"
import { Grid } from "react-raster"

const Wrapper = props => {
  return (
    <Grid
      {...props}
      alignX="center"
      breakpoints={[0, 400, 768, 1200, 1440]}
      colspan={12}
      gutterX={["1.5vw", "1.5vw", "2vw"]}
      gutterY={"3vw"}
      left={["3vw", "3vw", "3vw", "2vw"]}
      right={["3vw", "3vw", "3vw", "2vw"]}
      top={"2vw"}
      bottom={"2vw"}
    >
      {props.children}
    </Grid>
  )
}

export default Wrapper
