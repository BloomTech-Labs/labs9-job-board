import React, { Component } from "react";

import Navbar from "./Navbar";
import Backdrop from "./Backdrop";
import SideMenu from "./SideMenu";

class Navigation extends Component {
  state = {
    sideMenuOpen: false
  };

  sideMenuToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideMenuOpen: !prevState.sideMenuOpen };
    });
  };

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
