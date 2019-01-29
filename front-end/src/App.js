import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.scss";
import { withFirebase } from "./components/Firebase";

import Routes from "./components/Routes/Routes.js";
import Navigation from "./components/Navigation/Navigation";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null
    };
  }

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
          <Navigation authUser={this.state.authUser} />
          <Routes className="routes" authUser={this.state.authUser} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
