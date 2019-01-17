import React from "react";
import { NavLink } from "react-router-dom";
import { AuthenticatedUserContext } from "../Session/index.js";
import SignOut from "../SignOut/SignOut.js";
import "./NavigationStyles.css";

import * as ROUTES from "../../constants/routes";

const sideMenu = props => {
  let sideMenuClass = "side-menu";

  if (props.show) {
    sideMenuClass = "open";
  }
  return (
    <nav className={sideMenuClass}>
      <AuthenticatedUserContext.Consumer>
        {authenticatedUser =>
          authenticatedUser ? (
            <div className="side-menu-navigation-items">
              <NavLink onClick={props.click} to="/">
                Home
              </NavLink>
              <NavLink onClick={props.click} to="/jobs/:id">
                Single Job
              </NavLink>
              <NavLink onClick={props.click} to="/post-job">
                Post Job
              </NavLink>
              <NavLink onClick={props.click} to="/billing">
                Billing
              </NavLink>
              <NavLink onClick={props.click} to="/account">
                Account
              </NavLink>
              <SignOut className="hamburger-button" />
            </div>
          ) : (
            <div className="side-menu-navigation-items">
              <NavLink onClick={props.click} to="/">
                Home
              </NavLink>
              <NavLink onClick={props.click} to="/jobs/:id">
                Single Job
              </NavLink>
              <NavLink onClick={props.click} to="/sign-up">
                Sign Up
              </NavLink>
              <NavLink onClick={props.click} to="/sign-in">
                Sign In
              </NavLink>
              <NavLink onClick={props.click} to="/reset-password">
                Reset Password
              </NavLink>
            </div>
          )
        }
      </AuthenticatedUserContext.Consumer>
    </nav>
  );
};

export default sideMenu;
