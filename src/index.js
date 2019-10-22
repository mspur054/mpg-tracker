import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
//import "./styles.css";

import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./css/global";
import { theme } from "./css/theme";

import Firebase, { FirebaseContext } from "./components/Firebase";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </FirebaseContext.Provider>,
  rootElement
);
