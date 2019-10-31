import React, { useState, useEffect } from "react";
import { compose } from "recompose";

import { withAuthorization, AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

const INITIAL_STATE = {
  cars: [],
  loading: false,
  error: null
};

const HomePageBase = ({ loading, cars }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>The home page is accessible to signed in users.</p>
      {loading && <div>Loading...</div>}
      {cars && <CarList cars={cars} />}
      {!cars && <div>There are no cars...</div>}
    </div>
  );
};

const CarList = ({ cars }) => {
  return (
    <ul>
      {cars.map(car => (
        <li key={car.uid}>
          <span>{car.carname}</span>
          <span>{car.year}</span>
        </li>
      ))}
    </ul>
  );
};

const condition = authUser => !!authUser;

const HomePage = ({ firebase }) => {
  const [state, setState] = useState(INITIAL_STATE);

  useEffect(() => {
    setState({ loading: true });
    firebase
      .getUsercars(firebase.auth.currentUser.uid)
      .on("value", snapshot => {
        const carObject = snapshot.val();

        if (carObject) {
          const carList = Object.keys(carObject).map(key => ({
            ...carObject[key],
            uid: key
          }));
          setState({ cars: carList, loading: false });
        } else {
          setState({ cars: null, loading: false });
        }
      });

    //cleanup
    return () => firebase.cars().off();
  }, []);
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div>
          <HomePageBase cars={state.cars} loading={state.loading} />
        </div>
      )}
    </AuthUserContext.Consumer>
  );
};

export default compose(
  withFirebase,
  withAuthorization(condition)
)(HomePage);
