import React from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import { timingSafeEqual } from "crypto";

const SignInPage = () => {
  return (
    <div>
      <h1>SignIn</h1>
      <SignInForm></SignInForm>
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
}

export default SignInPage;
