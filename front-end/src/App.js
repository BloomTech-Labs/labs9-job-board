import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./components/Routes/Routes.js";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App container">
          {/* <NavBar /> */}
          <Routes />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
