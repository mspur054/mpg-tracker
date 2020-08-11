import React from "react";
import DatePicker from "react-datepicker";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { AuthUserContext } from "../Session";
import { withFirebase } from "../Firebase";

import {
  StyledTrackingForm,
  StyledTrackingFormButton,
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
  allFieldsValid: false,
};

class TrackingFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    const self = this;
    this.props.firebase.auth.onAuthStateChanged(function (user) {
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
      .on("value", (snapshot) => {
        const carObject = snapshot.val();

        if (carObject) {
          const carList = Object.keys(carObject).map((key) => ({
            ...carObject[key],
            uid: key,
          }));

          this.setState({
            cars: carList,
            loading: false,
            selectedCar: { value: carList[0].uid, label: carList[0].carname },
          });
        } else {
          this.setState({ cars: null, loading: false });
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.cars().off();
  }

  onSelectCar = (car) => {
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
      .catch((error) => {
        // TODO: Show errors...
        this.setState({ error });
      });
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      mileage,
      liters,
      entryDate,
      error,
      loading,
      cost,
      selectedCar,
      cars,
    } = this.state;
    const isInvalid = mileage === "" || liters === "" || entryDate === "";

    return (
      <AuthUserContext.Consumer>
        {(authUser) => (
          <>
            <h1>Add a Fuel Up</h1>
            <form
              autoComplete="off"
              onSubmit={(event) => this.onSubmit(event, authUser)}
            >
              <StyledTrackingForm>
                {loading && <div>Loading...</div>}

                <li>
                  <label>Vehicle</label>
                  {!loading && (
                    <select
                      required
                      onChange={(event) =>
                        this.setState({
                          selectedCar: { value: event.target.value },
                        })
                      }
                      value={this.state.selectedCar.value || ""}
                    >
                      {cars.map((car) => {
                        return (
                          <option key={car.uid} value={car.uid}>
                            {car.carname}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </li>
                <li>
                  <label htmlFor="mileage">Kilometers since last refill</label>
                  <input
                    name="mileage"
                    value={mileage}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Distance travelled"
                    step=".01"
                    min="0"
                    required
                  />
                </li>
                <li>
                  <label htmlFor="liters">Gas Consumed</label>
                  <input
                    required
                    name="liters"
                    value={liters}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Gas consumed"
                  />
                </li>
                <li>
                  <label htmlFor="cost">Total Cost</label>
                  <input
                    name="cost"
                    value={cost}
                    onChange={this.onChange}
                    type="number"
                    placeholder="Cost of refill"
                    step=".01"
                    min="0"
                  />
                </li>
                <li>
                  <label htmlFor="entryDate">Date of Refill</label>
                  <DatePicker
                    name="entryDate"
                    selected={entryDate}
                    maxDate={new Date()}
                    onChange={(date) => this.setState({ entryDate: date })}
                    required
                  ></DatePicker>
                </li>
                <li>
                  <StyledTrackingFormButton disabled={isInvalid} type="submit">
                    Save
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

export default compose(withFirebase, withRouter)(TrackingFormBase);
