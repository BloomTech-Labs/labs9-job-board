import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Routes from "./components/Routes/Routes.js";
import { withFirebase } from "./components/Firebase/index";
import SignOut from "./components/SignOut/SignOut";
import Toolbar from "./components/Toolbar/Toolbar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticatedUser: null
    };
  }

  componentDidMount() {
    this.listener = this.props.firebase.auth.onAuthStateChanged(
      authenticatedUser => {
        authenticatedUser
          ? this.setState({ authenticatedUser })
          : this.setState({ authenticatedUser: null });
      }
    );
  }

  componentWillUnmount() {
    this.listener();
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Toolbar />
          {this.state.authenticatedUser ? <SignOut /> : null}
          <Routes authenticatedUser={this.state.authenticatedUser} />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default withFirebase(App);
