import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import styled from "styled-components"

const ContactForm = props => {
  const encode = data => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&")
  }

  return (
    <FormStyle>
      <Formik
        initialValues={{
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        }}
        onSubmit={(values, actions) => {
          fetch("/", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({ "form-name": "contact-demo", ...values }),
          })
            .then(() => {
              alert("Thank you for your message! We will be in touch.")
              actions.resetForm()
            })
            .catch(() => {
              alert("There was a problem. Please try again later.")
            })
            .finally(() => actions.setSubmitting(false))
        }}
        validate={values => {
          const errors = {}
          if (!values.name) {
            errors.name = "Required"
          } else if (values.name.length > 15) {
            errors.name = "Must be 15 characters or less"
          }

          if (!values.service) {
            errors.service = "Please choose a service"
          }

          if (!values.email) {
            errors.email = "Required"
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address"
          }
        }}
      >
        <Form name={props.name} data-netlify="true">
          <input type="hidden" name={props.name} value={props.name} />
          <label htmlFor="name">Name: </label>
          <Field name="name" />
          <ErrorMessage name="name" />

          <label htmlFor="email">Email: </label>
          <Field name="email" />
          <ErrorMessage name="email" />

          <label htmlFor="service">Service: </label>
          <Field as="select" name="service">
            <option value="" disabled selected hidden>
              Choose a service...
            </option>
            <option>Web Development</option>
            <option>Web Design</option>
            <option>ECommerce Web Development</option>
            <option>Mobile App Design</option>
            <option>Mobile App Development</option>
            <option>Search Engine Optimisation</option>
            <option>Branding</option>
            <option>Logo Design</option>
            <option>Video animation</option>
            <option>Other</option>
          </Field>
          <ErrorMessage name="service" />

          <label htmlFor="message">Message: </label>
          <Field name="message" component="textarea" />

          <button type="submit">Send</button>
        </Form>
      </Formik>
    </FormStyle>
  )
}

const FormStyle = styled.div`
  text-align: left;
  input,
  select,
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

  button[type="submit"] {
    color: #ffffff;
    border-color: transparent;
    background-color: #ff1734;
    font-family: "Open Sans", sans-serif;
    text-transform: uppercase;
    font-weight: 700;
    margin-top: 10px;
    border-radius: 0;
    letter-spacing: 2px;
    font-size: 16px;
    padding: 14px 45px;
    width: 100%;
  }
`

export default ContactForm
