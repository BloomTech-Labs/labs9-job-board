import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.scss";
import Firebase, { FirebaseContext } from "./components/Firebase";

// wraps in firebase provider to access one instance throughout components
ReactDOM.render(
  <FirebaseContext.Provider value={new Firebase()}>
    <App />
  </FirebaseContext.Provider>,
  document.getElementById("root")
);
