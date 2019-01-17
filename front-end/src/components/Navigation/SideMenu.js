import React from "react";
import { NavLink } from "react-router-dom";
import "./NavigationStyles.css";

const sideMenu = props => {
  let sideMenuClass = "side-menu";

  if (props.show) {
    sideMenuClass = "open";
  }
  return (
    <nav className={sideMenuClass}>
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
    </nav>
  );
};

export default sideMenu;
