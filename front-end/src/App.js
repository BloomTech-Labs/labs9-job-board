import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { withAuthentication } from "./components/Session";

import Routes from "./components/Routes/Routes.js";
import Navigation from "./components/Navigation/Navigation";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navigation />
          <Routes className="routes" />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
