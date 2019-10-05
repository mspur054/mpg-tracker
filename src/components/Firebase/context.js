import React from "react";

const FireBaseContext = React.createContext(null);

export const withFirebase = Component => props => (
  <FireBaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FireBaseContext.Consumer>
);

export default FireBaseContext;
