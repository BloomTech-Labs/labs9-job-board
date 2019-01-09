import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import './App.css';
import LandingPage from './Components/LandingPage/LandingPage'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={LandingPage} />
        <Route path="/jobs" component={JobListing} />
        <Route path="/post_jobs" component={PostJobForm} />
        <Route path="/billing" component={Billing} />
        <Route path="/profile" component={Profile} />
      </div>
    );
  }
}

export default App;
