import React, { Component } from "react";

import Toolbar from "./Toolbar";
import Backdrop from "./Backdrop";

class Navigation extends Component {
  state = {
    sideMenuOpen: false
  };

  sideMenuToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideMenuOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideMenuOpen) {
      backdrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div className="App">
        <Toolbar sideMenuToggleClickHandler={this.sideMenuToggleClickHandler} />
        <SideMenu show={this.state.sideMenuOpen} />
        {backdrop}
      </div>
    );
  }
}

export default Navigation;
