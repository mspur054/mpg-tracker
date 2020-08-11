import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import { useFormik } from "formik";
import * as Yup from "yup";

const PasswordForgetPage = () => (
  <div>
    <h1>Reset Password</h1>
    <PasswordForgetForm />
  </div>
);

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email Required"),
});

const PasswordHook = ({ firebase, ...props }) => {
  const { handleSubmit, handleChange, handleBlur, errors } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm, setErrors }) => {
      firebase
        .doPasswordReset(values.email)
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          setErrors({ email: error.message });
        });
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        placeholder="Email"
      />
      <p style={{ fontStyle: "italic" }}>
        We will send you an email to reset your password
      </p>
      <button type="submit">Submit</button>
      {errors && <p>{errors.email}</p>}
    </form>
  );
};

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);
export default PasswordForgetPage;
const PasswordForgetForm = withFirebase(PasswordHook);
export { PasswordForgetForm, PasswordForgetLink };
