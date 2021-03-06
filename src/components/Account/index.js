import React, { useState, useEffect, useContext } from "react";
import { compose } from "recompose";
import { withFirebase } from "../Firebase";

import { AuthUserContext, withAuthorization } from "../Session";
import { PasswordForgetForm } from "../PasswordForget";
import Spinner from "../Spinner";
import TempSwitch from "../TempSwitch";

const INITIAL_STATE = {
  user: null,
  loading: false,
};

const AccountPage = ({ firebase }) => {
  const [state, setState] = useState(INITIAL_STATE);
  // ! Figure out how to use this instead of
  const authUser = useContext(AuthUserContext);

  useEffect(() => {
    setState({ loading: true });
    firebase.auth.onAuthStateChanged(function (user) {
      if (user) {
        const response = firebase.db.ref(`/users/${user.uid}`);

        const userData = response.on("value", (snapshot) => {
          const entriesObject = snapshot.val();
          if (entriesObject) {
            setState({
              user: entriesObject,
              loading: false,
            });
          }
        });
      } else {
        // No user is signed in.

        setState({
          user: null,
          loading: false,
        });
      }
    });
  }, [authUser]);

  const updateUser = (user) => {
    const ref = firebase.db.ref(`/users/${authUser.uid}`);
    //TODO update mileage preference in multiple places...
    //let updates = {}
    //updates['summaryStats']

    ref.update(user, function (error) {
      if (error) {
        // The write failed...
        console.log("write failed");
      } else {
        console.log("worked");
      }
    });
  };

  const handleToggle = () => {
    //TODO add code to update in firebase db
    const newUserState = { ...state.user, isMetric: !state.user.isMetric };
    setState(
      {
        user: newUserState,
        loading: false,
      },
      updateUser(newUserState)
    );
  };
  const { user, loading } = state;
  return (
    <AuthUserContext.Consumer>
      {(authUser) => (
        <div>
          <h1>Account Dashboard</h1>
          {loading && <Spinner />}
          {user && (
            <>
              <p>Hello {user.username}!</p>
              <p>
                From the Account Dashboard you can update your account
                information.
              </p>
              <h4>Account information</h4>
              <p>
                {user.username} <br />
                {user.email}
              </p>
              <div>
                <h4>Select Units</h4>
                <TempSwitch
                  isOn={state.user.isMetric}
                  handleToggle={handleToggle}
                />
              </div>

              <h4>Edit password</h4>
              <PasswordForgetForm email={user.email} />
            </>
          )}
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

const condition = (authUser) => !!authUser;

export default compose(withFirebase, withAuthorization(condition))(AccountPage);
