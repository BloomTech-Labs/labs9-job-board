import React, { Component } from "react";
import "./App.css";
import JobsContainer from "./components/jobsContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <JobsContainer />
      </div>
    );
  }
}

export default App;
