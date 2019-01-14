import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./components/Routes/Routes.js";
import NavBar from "./components/NavBar/navBar";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <div className="container">
            <Routes />
          </div>
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default App;
