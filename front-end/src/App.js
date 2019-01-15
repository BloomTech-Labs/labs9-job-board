import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Routes from "./components/Routes/Routes.js";
import { withAuthentication } from './components/Sessions/index.js';

import SignOut from './components/SignOut/SignOut';
import NavBar from "./components/NavBar/navBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Routes />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
