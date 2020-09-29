import React from "react"
import styled from "styled-components"

const ProgressBar = styled.div`
  position: relative;
  height: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #333;
  margin: 5px 0;
`
const Filler = styled.div`
  background-color: ${props => props.theme.colors.accent};
  height: 100%;
  border-radius: inherit;
  transition: width 0.2s ease-in;
  width: ${props => props.percentage}%;
`

const Wrapper = props => {
  return (
    <ProgressBar>
      <Filler percentage={props.percentage} />
    </ProgressBar>
  )
}

export default Wrapper
