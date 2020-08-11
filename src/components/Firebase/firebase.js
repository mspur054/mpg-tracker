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
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
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

  doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = (password) =>
    this.auth.currentUser.updatePassword(password);

  doSendEmailVerification = () => {
    this.auth.currentUser.sendEmailVerification({
      url: process.env.REACT_APP_CONFIRMATION_EMAIL_REDIRECT,
    });
  };

  // USER

  user = (uid) => this.db.ref(`users/${uid}`);

  users = () => this.db.ref("users");

  // CARS

  car = (userId, carId) => this.db.ref(`cars/${userId}/${carId}`);

  cars = () => this.db.ref(`cars`);

  getUsercars = (userId) => this.db.ref(`cars/${userId}`);

  doCreateCar = (userId, name, year) => {
    const newCarKey = this.db.ref().child(`cars/${userId}`).push().key;

    return this.db.ref(`cars/${userId}/${newCarKey}`).set({
      userId: userId,
      carname: name,
      year: year,
      dateAdded: this.serverValue.TIMESTAMP,
    });
  };

  deleteCar = (userId, carId) => {
    this.car(userId, carId).remove();
  };

  //MPG tracking

  gasEntry = (userId, gasId) => this.db.ref(`gasEntries/${userId}/${gasId}`);

  gasEntries = () => this.db.ref(`gasEntries`);

  getCarGasEntries = (userId, carId) => {
    this.db.ref(`gasEntries/${userId}`).orderByChild("carId").equalTo(carId);
  };

  deleteCarGasEntries = (userId, carId) => {
    this.db
      .ref(`gasEntries/${userId}`)
      .orderByChild("carId")
      .equalTo(carId)
      .remove();
  };

  getUserGasEntries = (userId) => {
    this.db.ref(`gasEntries/${userId}`);
  };

  doCreateGasEntry = (userId, carId, mileage, liters, entryDate, cost) => {
    const newGasKey = this.db.ref().child(`gasEntries/${userId}`).push().key;

    return this.db.ref(`gasEntries/${userId}/${newGasKey}`).set({
      userId: userId,
      carId: carId,
      mileage: mileage,
      liters: liters,
      entryDate: entryDate.getTime(),
      cost: cost,
      dateAdded: this.serverValue.TIMESTAMP,
      units: 1, //KM and Liters
      kmPerHundred: (liters / mileage) * 100,
    });
  };

  //Admin functions

  doAddKmPerHundred = (userId) => {
    console.log(userId);
    const ref = this.db.ref(`gasEntries/${userId}`);
    const result = ref.once("value").then(function (snapshot) {
      let updates = {};
      snapshot.forEach((entrySnapshot) => {
        const entry = entrySnapshot.val();
        console.log((entry.liters / entry.mileage) * 100);
        updates[`${entrySnapshot.key}/kmPerHundred`] =
          (entry.liters / entry.mileage) * 100;
      });
      ref.update(updates);
    });
  };

  //Analytics - Cloud functions?

  doCreatePerformanceStats = (userId, carId) => {
    const newCarPerformanceKey = this.db
      .ref()
      .child(`carPerformanceStats/${carId}`)
      .push().key;

    return this.db
      .ref(`carPerformanceStats/${carId}/${newCarPerformanceKey}`)
      .set({
        userId: userId,
        dateAdded: this.serverValue.TIMESTAMP,
        numberOfFuelUps: 0,
        totalCost: 0,
        totalLiters: 0,
        averageMPG: 0.0,
        lastMPG: 0.0,
        totalDistance: 0,
        dateLastFueledUp: null,
      });
  };

  doUpdatePerformanceStats = (userId, carId) => {
    //Get Entries
    this.getCarGasEntries();
  };

  doSummarizeCarData = (userId, carId) => {
    const ref = this.db
      .ref(`gasEntries/${userId}`)
      .orderByChild("carId")
      .equalTo(carId);
    let data = {};
    const listener = ref.once("value", (snapshot) => {
      const entriesObject = snapshot.val();
      if (entriesObject) {
        const entriesList = Object.keys(entriesObject).map((key) => ({
          ...entriesObject[key],
          uid: key,
        }));
        data = entriesList.reduce(
          (acc, curr) => {
            const keys = ["cost", "liters", "mileage"];

            keys.forEach((field) => {
              acc.hasOwnProperty(field)
                ? (acc[field] += Number(curr[field]))
                : (acc[field] = Number(curr[field]));
            });
            acc["count"] += 1;
            return acc;
          },
          { count: 0 }
        );

        return entriesList;
      }

      // const carData = this.db.ref(`cars/${carId}`).update({
      //   data:{
      //     1
      //   }
      // })
    });
    return this.db
      .ref(`cars/${userId}/${carId}`)
      .update({ summarizedEntries: data })
      .then(() => {
        // Each then() should return a value or throw
        return "Update successful";
      })
      .catch((error) => {
        // handle the error however you like
        console.error(error);
      });
  };
}

//export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default Firebase;
