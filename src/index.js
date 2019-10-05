import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./styles.css";

import Firebase, { FirebaseContext } from "./components/Firebase";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  rootElement
);
