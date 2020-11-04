import React from "react";

import { withFirebase } from "../Firebase";

const UnitContext = React.createContext({
  userSettings: {},
});

export { UnitContext };

const withUnits = (Component) => {
  class withUnits extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        userSettings: JSON.parse(localStorage.getItem("userSettings")),
      };
    }
    componentDidMount() {
      this.listener = this.props.firebase.auth.onAuthStateChanged(
        (authUser) => {
          const ref = this.props.firebase.db.ref(`/users/${authUser.uid}`);
          ref.on("value", (snapshot) => {
            const userSettings = snapshot.val();
            localStorage.setItem("userSettings", JSON.stringify(userSettings));
            this.setState({ userSettings });
          });
        },
        () => {
          localStorage.removeItem("userSettings");
          this.setState({ userSettings: null });
        }
      );
    }

    componentWillUnmount() {
      this.listener();
    }

    render() {
      return (
        <UnitContext.Provider value={this.state.userSettings}>
          <Component {...this.props} />
        </UnitContext.Provider>
      );
    }
  }
  return withFirebase(withUnits);
};

export default withUnits;
