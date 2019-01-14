import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./components/Routes/Routes.js";
import { withFirebase } from './components/Firebase/index';
import SignOut from './components/SignOut/SignOut';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticatedUser: null
    }
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(authenticatedUser => {
      authenticatedUser
        ? this.setState({ authenticatedUser })
        : this.setState({ authenticatedUser: null });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          {/* <NavBar /> */}
          {this.state.authenticatedUser ? <SignOut /> : null}
          <Routes authenticatedUser={this.state.authenticatedUser} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
