import React from "react"
import { useFormik } from "formik"
import styled from "styled-components"
import { config } from "react-transition-group"

const validate = values => {
  const errors = {}
  if (!values.firstName) {
    errors.firstName = "Required"
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less"
  }

  if (!values.service) {
    errors.service = "Please choose a service"
  }

  if (!values.lastName) {
    errors.lastName = "Required"
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less"
  }

  if (!values.email) {
    errors.email = "Required"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address"
  }

  return errors
}

const ContactForm = props => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      service: "",
    },
    validate,
    onSubmit: values => {
      // alert(JSON.stringify(values, null, 2))
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: JSON.stringify(values, null, 2),
      })
        .then(() => console.log("Submitting.."))
        .catch(error => alert(error))
    },
  })
  return (
    <FormStyle>
      <form
        name={props.name}
        onSubmit={formik.handleSubmit}
        data-netlify="true"
        method="post"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name={props.name} value="contact" />
        <label htmlFor="service">Service type</label>
        <select
          id="service"
          name="service"
          required
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.service}
        >
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
        </select>
        <label htmlFor="firstName">First Name</label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.firstName}
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}
        <label htmlFor="lastName">Last Name</label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.lastName}
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}
        <button type="submit">Submit</button>
      </form>
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
