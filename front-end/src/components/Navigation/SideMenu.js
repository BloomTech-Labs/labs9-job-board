import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const sideMenu = props => {
  let sideMenuClass = "side-menu";

  if (props.show) {
    sideMenuClass = "open";
  }
  return (
    <nav className={sideMenuClass}>
      <div className="side-menu-navigation-items">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/jobs/:id">Single Job</NavLink>
        <NavLink to="/post-job">Post Job</NavLink>
        <NavLink to="/billing">Billing</NavLink>
        <NavLink to="/account">Account</NavLink>
        <NavLink to="/sign-up">Sign Up</NavLink>
        <NavLink to="/sign-in">Sign In</NavLink>
        <NavLink to="/reset-password">Reset Password</NavLink>
      </div>
    </nav>
  );
};

export default sideMenu;
