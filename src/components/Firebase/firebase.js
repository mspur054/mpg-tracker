//import { app, apps } from "firebase/app";
import firebase from "firebase/app";
import "firebase/auth";

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
    if (!firebase.apps.length) {
      firebase.initializeApp(config);

      this.auth = firebase.auth();
    }
  }

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.doCreateUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.doSignInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.doSignOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);
}

//export default !firebase.apps.length ? firebase.initializeApp(config) : firebase.app();

export default Firebase;
