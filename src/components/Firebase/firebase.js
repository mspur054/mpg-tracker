//import { app, apps } from "firebase/app";
import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: "",
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID
};

class Firebase {
  constructor() {
    app.initializeApp(config);

    this.serverValue = app.database.ServerValue;

    this.auth = app.auth();
    this.db = app.database();
  }

  // AUTH

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // USER

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // CARS

  car = carId => this.db.ref(`cars/${carId}`);

  getUsercars = userId =>
    this.db
      .ref(`cars`)
      .orderByChild("userId")
      .equalTo(userId);

  cars = () => this.db.ref(`cars`);

  doCreateCar = (userId, name, year) => {
    const newCarKey = this.db
      .ref()
      .child("cars")
      .push().key;

    return this.db.ref(`cars/${newCarKey}`).set({
      userId: userId,
      carname: name,
      year: year,
      dateAdded: this.serverValue.TIMESTAMP
    });
  };

  //MPG tracking

  gasEntry = uid => this.db.ref(`gasEntries/${uid}`);

  getCarGasEntries = carId => {
    this.db
      .ref(`gasEntries`)
      .orderByChild("carId")
      .equalTo(carId);
  };

  getUserGasEntries = userId => {
    this.db
      .ref(`gasEntries`)
      .orderByChild("userId")
      .equalTo(userId);
  };

  doCreateGasEntry = (userId, carId, mileage, liters, entryDate, cost) => {
    const newGasKey = this.db
      .ref()
      .child("gasEntries")
      .push().key;

    return this.db.ref(`gasEntries/${newGasKey}`).set({
      userId: userId,
      carId: carId,
      mileage: mileage,
      liters: liters,
      entryDate: entryDate,
      cost: cost,
      dateAdded: this.serverValue.TIMESTAMP,
      units: 1 //KM and Liters
    });
  };
}

//export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default Firebase;
