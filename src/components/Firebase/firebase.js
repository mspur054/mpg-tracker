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

  car = (userId, carId) => this.db.ref(`cars/${userId}/${carId}`);

  cars = () => this.db.ref(`cars`);

  getUsercars = userId => this.db.ref(`cars/${userId}`);

  doCreateCar = (userId, name, year) => {
    const newCarKey = this.db
      .ref()
      .child(`cars/${userId}`)
      .push().key;

    return this.db.ref(`cars/${userId}/${newCarKey}`).set({
      userId: userId,
      carname: name,
      year: year,
      dateAdded: this.serverValue.TIMESTAMP
    });
  };

  //MPG tracking

  gasEntry = (userId, gasId) => this.db.ref(`gasEntries/${userId}/${gasId}`);

  gasEntries = () => this.db.ref(`gasEntries`);

  getCarGasEntries = (userId, carId) => {
    this.db.ref(`gasEntries/${userId}/${carId}`);
  };

  getUserGasEntries = userId => {
    this.db.ref(`gasEntries/${userId}`);
  };

  doCreateGasEntry = (userId, carId, mileage, liters, entryDate, cost) => {
    const newGasKey = this.db
      .ref()
      .child(`gasEntries/${userId}`)
      .push().key;

    return this.db.ref(`gasEntries/${userId}/${newGasKey}`).set({
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
