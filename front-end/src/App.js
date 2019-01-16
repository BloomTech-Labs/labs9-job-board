import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import { withAuthentication } from "./components/Session";
import { AuthenticatedUserContext } from "./components/Session/index.js";

import Routes from "./components/Routes/Routes.js";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/Backdrop/Backdrop";
import SignOut from "./components/SignOut/SignOut.js";

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let sideDrawer;
    let backdrop;

    if (this.state.sideDrawerOpen) {
      sideDrawer = <SideDrawer />;
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <Router>
        <div className="App">
          <Toolbar drawerToggleClickHandler={this.drawerToggleClickHandler} />
          {sideDrawer}
          {backdrop}
          <AuthenticatedUserContext.Consumer>
            {authenticatedUser => (authenticatedUser ? <SignOut /> : null)}
          </AuthenticatedUserContext.Consumer>
          <Routes className="routes" />
          {/* <Footer /> */}
        </div>
      </Router>
    );
  }
}

export default withAuthentication(App);
