import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";

import { AuthUserContext, withAuthorization } from "../Session";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import CarList from "./CarList";

const CarPage = ({ cars, loading }) => (
  <div>
    <h1>Cars</h1>

    <CarPageForm></CarPageForm>
  </div>
);

const INITIAL_STATE = {
  carname: "",
  year: "",
  error: null,
  loading: false,
  cars: []
};

class CarPageFormBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  componentDidMount() {
    this.onGetCars();
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

  onEditCar = (car, updatedCar) => {
    const { uid, ...carSnapshot } = updatedCar;

    this.props.firebase.car(car.uid).set({
      ...carSnapshot,
      editedAt: this.props.firebase.serverValue.TIMESTAMP
    });
  };

  onDeleteCar = uid => {
    this.props.firebase.car(uid).remove();
  };

  onSubmit = (event, authUser) => {
    const { carname, year } = this.state;

    this.props.firebase
      .doCreateCar(authUser.uid, carname, year)
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
    const { cars, loading, carname, year, error } = this.state;
    const isInvalid = carname === "" || year === "";

    return (
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {loading && <div>Loading...</div>}
            {cars && (
              <CarList
                authUser={authUser}
                onEditCar={this.onEditCar}
                onDeleteCar={this.onDeleteCar}
                cars={cars}
              />
            )}
            {!cars && <div>There are no cars...</div>}
            <h2>Add a Car</h2>
            <form onSubmit={event => this.onSubmit(event, authUser)}>
              <input
                name="carname"
                value={carname}
                onChange={this.onChange}
                type="text"
                placeholder="Car Name"
              />
              <input
                name="year"
                value={year}
                onChange={this.onChange}
                type="text"
                placeholder="Car Year"
              />
              <button disabled={isInvalid} type="submit">
                Add Car
              </button>
              {error && <p>{error.message}</p>}
            </form>
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

const condition = authUser => !!authUser;

const CarPageForm = compose(
  withRouter,
  withFirebase,
  withAuthorization(condition)
)(CarPageFormBase);

export default CarPage;
