import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navigation from "../Navigation";
import LandingPage from "../Landing";
import SignUpPage from "../SignUp";
import SignInPage from "../SignIn";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import CarPage from "../Cars";
import Burger from "../Burger";

//TEMPORARY
import TrackingFormBase from "../Track";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session/";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.setWrapperRef = this.setWrapperRef.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);

    this.state = {
      authUser: null,
      open: false
    };
  }

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  setWrapperRef(node) {
    this.wrapperRef = node;
  }

  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.setState({ open: false });
    }
  }

  changeOpen = () => {
    this.setState(prevState => ({ open: !prevState.open }));
  };

  render() {
    return (
      <Router>
        <div ref={this.setWrapperRef}>
          <Burger open={this.state.open} changeOpen={this.changeOpen} />
          <Navigation open={this.state.open} />
        </div>
        <div>
          <hr />
          <Route exact path={ROUTES.LANDING} component={LandingPage} />
          <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
          <Route path={ROUTES.SIGN_IN} component={SignInPage} />
          <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />
          <Route path={ROUTES.HOME} component={HomePage} />
          <Route path={ROUTES.ACCOUNT} component={AccountPage} />
          <Route path={ROUTES.ADMIN} component={AdminPage} />
          <Route path={ROUTES.CARS} component={CarPage} />
          <Route path={ROUTES.DATA_ENTRY} component={TrackingFormBase} />
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
