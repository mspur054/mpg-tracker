import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import { StyledSignInForm } from "./SignIn.styled";

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <SignInForm></SignInForm>
      <PasswordForgetLink></PasswordForgetLink>
      <SignUpLink></SignUpLink>
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class SignInFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
      <StyledSignInForm onSubmit={this.onSubmit}>
        <div>
          <label>Email</label>
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
        </div>
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
        {error && <p>{error.message}</p>}
      </StyledSignInForm>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);
export default SignInPage;
export { SignInForm };
