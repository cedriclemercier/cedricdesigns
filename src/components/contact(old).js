import React from "react"
import styled from "styled-components"

const FormStyle = styled.div`
  input,
  textarea {
    display: block;
    width: 100%;
    height: calc(1.5em + 0.75rem + 2px);
    padding: 0.375rem 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    margin-bottom: 10px;
    border-radius: 0px;
    border-color: rgba(12, 12, 12, 0.13);
    min-height: 50px;
  }

  input[type="textarea"] {
    height: auto;
  }

  input[type="submit"] {
    color: #ffffff;
    border-color: transparent;
    background-color: #ff1734;
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    border-radius: 0;
    letter-spacing: 2px;
    font-size: 16px;
    padding: 17px 45px;
  }
`

const Contact = props => {
  return (
    <FormStyle>
      <form method="POST">
        <input
          name="name"
          type="text"
          placeholder="Enter your name"
          required=""
        />
        <input
          name="email"
          type="email"
          placeholder="Enter your email address"
          required=""
        />
        <textarea
          name="message"
          placeholder="What's your request?"
          rows="4"
          required=""
        />
        <div className="contact-submit">
          <input type="submit" value="Send a message" />
        </div>
      </form>
    </FormStyle>
  )
}

export default Contact
