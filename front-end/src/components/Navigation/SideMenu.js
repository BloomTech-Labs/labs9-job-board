import React from "react";
import { NavLink } from "react-router-dom";
import SignOut from "../SignOut/SignOut.js";
import "./NavigationStyles.css";

import LoadingBar from "../../images/loading-bars.svg";

//import * as ROUTES from "../../constants/routes";

class sideMenu extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { authUser: "" };
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevProps.authUser !== this.props.authUser) {
  //     this.setState({ authUser: this.props.authUser });
  //   }
  // }

  render() {
    let sideMenuClass = "side-menu";

    if (this.props.show) {
      sideMenuClass = "open";
    }
    return (
      <nav className={sideMenuClass}>
        {this.props.authUser ? (
          <div className="side-menu-navigation-items">
            <NavLink onClick={this.props.click} to="/">
              Home
            </NavLink>
            <NavLink onClick={this.props.click} to="/jobs/:id">
              Single Job
            </NavLink>
            <NavLink onClick={this.props.click} to="/post-job">
              Post Job
            </NavLink>
            <NavLink onClick={this.props.click} to="/billing">
              Billing
            </NavLink>
            <NavLink onClick={this.props.click} to="/account">
              Account
            </NavLink>
            <SignOut className="hamburger-button" />
          </div>
        ) : (
          <div className="side-menu-navigation-items">
            <NavLink onClick={this.props.click} to="/">
              Home
            </NavLink>
            <NavLink onClick={this.props.click} to="/jobs/:id">
              Single Job
            </NavLink>
            <NavLink onClick={this.props.click} to="/sign-up">
              Sign Up
            </NavLink>
            <NavLink onClick={this.props.click} to="/sign-in">
              Sign In
            </NavLink>
            <NavLink onClick={this.props.click} to="/reset-password">
              Reset Password
            </NavLink>
          </div>
        )}
      </nav>
    );
  }
}

export default sideMenu;
