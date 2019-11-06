import React from "react";
import DatePicker from "react-datepicker";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

import TrackingDropDown from "../TrackingDropDown";
import {
  StyledTrackingForm,
  StyledTrackingFormButton,
  StyledTrackingFormInput
} from "./TrackingForm.styled";

import * as ROUTES from "../../constants/routes";
import "react-datepicker/dist/react-datepicker.css";

const INITIAL_STATE = {
  selectedCar: { label: null, value: null },
  mileage: "",
  liters: "",
  error: null,
  cost: "",
  entryDate: new Date(),
  loading: false,
  cars: [],
  ddCars: []
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
          const ddList = [];
          carList.forEach((car, i) => {
            ddList[i] = {
              value: car.uid,
              label: car.carname
            };
          });

          this.setState({ cars: carList, loading: false, ddCars: ddList });
        } else {
          this.setState({ cars: null, loading: false, ddCars: null });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  onSelectCar = car => {
    this.setState({ selectedCar: car });
  };

  onSubmit = (event, authUser) => {
    const { selectedCar, mileage, liters, entryDate, cost } = this.state;

    this.props.firebase
      .doCreateGasEntry(
        authUser.uid,
        selectedCar.value,
        mileage,
        liters,
        entryDate,
        cost
      )
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
      ddCars,
      loading,
      cost,
      selectedCar
    } = this.state;
    const isInvalid = mileage === "" || liters === "" || entryDate === "";
    const defaultOption = selectedCar.label;

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <h1>Add an Entry</h1>
            <form onSubmit={event => this.onSubmit(event, authUser)}>
              <StyledTrackingForm>
                {loading && <div>Loading...</div>}
                <TrackingDropDown
                  ddCars={ddCars}
                  defaultOption={defaultOption}
                  onChange={this.onSelectCar}
                ></TrackingDropDown>
                <li>
                  <label for="mileage">Mileage</label>
                  <StyledTrackingFormInput
                    name="mileage"
                    value={mileage}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Distance travelled"
                  />
                </li>
                <li>
                  <label for="liters">Gas Consumed</label>
                  <input
                    name="liters"
                    value={liters}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Gas consumed"
                  />
                </li>
                <li>
                  <label for="cost">Cost</label>
                  <input
                    name="cost"
                    value={cost}
                    onChange={this.onChange}
                    type="text"
                    placeholder="Cost of refill"
                  />
                </li>
                <li>
                  <label for="entryDate">Date of Refill</label>
                  <DatePicker
                    name="entryDate"
                    selected={entryDate}
                    maxDate={new Date()}
                    onChange={date => this.setState({ entryDate: date })}
                  ></DatePicker>
                </li>
                <li>
                  <StyledTrackingFormButton disabled={isInvalid} type="submit">
                    Add Entry
                  </StyledTrackingFormButton>
                </li>
                {error && <p>{error.message}</p>}
              </StyledTrackingForm>
            </form>
          </>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default compose(
  withFirebase,
  withRouter
)(TrackingFormBase);
