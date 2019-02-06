import React, { Component } from "react";

import Navbar from "./Navbar";
import Backdrop from "./Backdrop";
import SideMenu from "./SideMenu";

class Navigation extends Component {
  // Treated as the main app for the navigation
  state = {
    sideMenuOpen: false
  };

  // Handles toggle of the side menu
  sideMenuToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

  // Closes side menu
  closeSideMenuClickHandler = () => {
    this.setState({ sideMenuOpen: false });
  };

  render() {
    let backdrop;
    if (this.state.sideMenuOpen) {
      backdrop = <Backdrop click={this.closeSideMenuClickHandler} />;
    }

    return (
      <div>
        <Navbar sideMenuToggleClickHandler={this.sideMenuToggleClickHandler} />
        <SideMenu
          click={this.closeSideMenuClickHandler}
          show={this.state.sideMenuOpen}
          authUser={this.props.authUser}
        />
        {backdrop}
      </div>
    );
  }
}

export default Navigation;
