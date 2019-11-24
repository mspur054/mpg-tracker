import React from "react";
import { Link } from "react-router-dom";

import SignOutButton from "../SignOut";
import * as ROUTES from "../../constants/routes";
import { AuthUserContext } from "../Session";

import { StyledMenu } from "./Navigation.styled";

const Navigation = ({ open }) => {
  return (
    <StyledMenu open={open}>
      <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigatonAuth /> : <NavigationNonAuth />)}
      </AuthUserContext.Consumer>
    </StyledMenu>
  );
};

const NavigatonAuth = () => (
  <ul className="main-nav">
    <li>
      <Link className="nav-links" to={ROUTES.HOME}>
        Home
      </Link>
    </li>
    <li>
      <Link className="nav-links" to={ROUTES.ACCOUNT}>
        Account
      </Link>
    </li>
    <li>
      <Link className="nav-links" to={ROUTES.ADMIN}>
        Admin
      </Link>
    </li>
    <li>
      <Link className="nav-links" to={ROUTES.CARS}>
        Cars
      </Link>
    </li>
    <li>
      <Link className="nav-links" to={ROUTES.DATA_ENTRY}>
        Entries
      </Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
  </ul>
);
export default Navigation;
