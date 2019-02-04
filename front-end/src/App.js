import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import { withFirebase } from "./components/Firebase";

import Routes from "./components/Routes/Routes.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

  // adds event listener that updates state once Firebase instance detects change in the auth user status
  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState({ authUser })
        : this.setState({ authUser: null });
    });
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Routes className="routes" authUser={this.state.authUser} />
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
