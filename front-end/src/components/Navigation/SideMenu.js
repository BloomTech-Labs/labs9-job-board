import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "../SignOut/SignOut.js";

import * as ROUTES from "../../constants/routes";

class sideMenu extends React.Component {
  render() {
    let sideMenuClass = "side-menu";

    if (this.props.show) {
      sideMenuClass = "open";
    }
    return (
      // Design of the side menu
      <nav className={sideMenuClass}>
        {this.props.authUser ? (
          <div className="side-menu-navigation-items">
            <NavLink onClick={this.props.click} to="/">
              Home
            </NavLink>
            <NavLink onClick={this.props.click} to="/post-job">
              Post A Job
            </NavLink>
            <NavLink onClick={this.props.click} to="/billing">
              Billing
            </NavLink>
            <NavLink onClick={this.props.click} to="/account">
              Account Settings
            </NavLink>
            <SignOut onClick={this.props.click} className="sign-out" />
          </div>
        ) : (
          <div className="side-menu-navigation-items">
            <NavLink onClick={this.props.click} to="/">
              Home
            </NavLink>
            {/* <NavLink onClick={this.props.click} to="/post-job">
              Post A Job
            </NavLink> */}
            <NavLink onClick={this.props.click} to="/sign-up">
              Employer Sign Up
            </NavLink>
            <NavLink onClick={this.props.click} to="/sign-in">
              Employer Sign In
            </NavLink>
            <NavLink onClick={this.props.click} to={ROUTES.RESET_PASSWORD}>
              Reset Password
            </NavLink>
          </div>
        )}
      </nav>
    );
  }
}

export default sideMenu;
