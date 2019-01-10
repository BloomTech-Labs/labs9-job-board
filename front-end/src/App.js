<<<<<<< HEAD
import React, { Component } from "react";
import "./App.css";
import JobsContainer from "./components/jobsContainer";
=======
import React, { Component } from 'react';
import './App.css';
import JobsContainer from './components/jobContainer/jobsContainer.js';
>>>>>>> 6f8ee14e42d84c362d2d5b7b5f4dd66db3ddd101

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
