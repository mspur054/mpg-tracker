import React from "react";
import DatePicker from "react-datepicker";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";
import DropDown from "../DropDown";

import * as ROUTES from "../../constants/routes";
import "react-datepicker/dist/react-datepicker.css";

const INITIAL_STATE = {
  carId: null,
  mileage: "",
  liters: "",
  error: null,
  cost: "",
  entryDate: new Date(),
  loading: false,
  error: null,
  cars: []
};

class TrackingFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const self = this;
    this.props.firebase.auth.onAuthStateChanged(function(user) {
      if (user) {
        console.log(self.onGetCars());
      } else {
        console.log("no user");
      }
    });
    //this.onGetCars();
  }

  onGetCars = () => {
    this.setState({ loading: true });

    this.props.firebase
      .getUsercars(this.props.firebase.auth.currentUser.uid)
      .on("value", snapshot => {
        const carObject = snapshot.val();

        if (carObject) {
          const carList = Object.keys(carObject).map(key => ({
            ...carObject[key],
            uid: key
          }));
          this.setState({ cars: carList, loading: false });
        } else {
          this.setState({ cars: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  onSelectCar = carId => {
    this.setState({ carId });
  };

  onSubmit = (event, authUser) => {
    const { carId, mileage, liters, entryDate, cost } = this.state;

    this.props.firebase
      .doCreateGasEntry(authUser.uid, carId, mileage, liters, entryDate, cost)
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
    const {
      mileage,
      liters,
      entryDate,
      error,
      cars,
      loading,
      cost
    } = this.state;
    const isInvalid = mileage === "" || liters === "" || entryDate === "";

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <form onSubmit={event => this.onSubmit(event, authUser)}>
            {loading && <div>Loading...</div>}
            <DropDown cars={cars} onSelectCar={this.onSelectCar}></DropDown>
            <input
              name="mileage"
              value={mileage}
              onChange={this.onChange}
              type="text"
              placeholder="Distance travelled"
            />
            <input
              name="liters"
              value={liters}
              onChange={this.onChange}
              type="text"
              placeholder="Gas consumed"
            />
            <input
              name="cost"
              value={cost}
              onChange={this.onChange}
              type="text"
              placeholder="Cost of refill"
            />
            <DatePicker
              name="entryDate"
              selected={entryDate}
              maxDate={new Date()}
              onChange={date => this.setState({ entryDate: date })}
            ></DatePicker>
            <button disabled={isInvalid} type="submit">
              Add Entry
            </button>
            {error && <p>{error.message}</p>}
          </form>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(
  withFirebase,
  withRouter
)(TrackingFormBase);
