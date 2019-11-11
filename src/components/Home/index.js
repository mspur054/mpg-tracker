import React, { useState, useEffect } from "react";
import { compose } from "recompose";

import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import { StyledNumEntries } from "./Home.styled";

const INITIAL_STATE = {
  entries: [],
  loading: false,
  error: null
};

const HomePageBase = ({ loading, entries }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The home page is accessible to signed in users.</p>
      {loading && <div>Loading...</div>}
      {entries && <StyledNumEntries>{entries.length}</StyledNumEntries>}

      {/* {!cars && <div>There are no cars...</div>} */}
    </div>
  );
};

const condition = authUser => !!authUser;

const HomePage = ({ firebase }) => {
  const [state, setState] = useState(INITIAL_STATE);
  //.getUserGasEntries(firebase.auth.currentUser.uid)
  useEffect(() => {
    setState({ loading: true });
    console.log(firebase.auth.currentUser.uid);
    firebase.gasEntries().on("value", snapshot => {
      const entriesObject = snapshot.val();

      if (entriesObject) {
        const entriesList = Object.keys(entriesObject).map(key => ({
          ...entriesObject[key],
          uid: key
        }));
        setState({ entries: entriesList, loading: false });
      } else {
        setState({ entries: null, loading: false });
      }
    });

    //cleanup
    return () => firebase.gasEntries().off();
  }, []);
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <HomePageBase entries={state.entries} loading={state.loading} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);
