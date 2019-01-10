import React, { Component } from 'react';
import './App.css';
import JobsContainer from './components/jobContainer/jobsContainer.js';

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
