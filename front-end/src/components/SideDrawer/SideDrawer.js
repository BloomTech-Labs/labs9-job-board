import React from "react";
import { NavLink } from "react-router-dom";
import "./SideDrawer.css";

const SideDrawer = props => {
  return (
    <nav className="side-drawer">
      <div className="side-drawer-navigation-items">
        <NavLink className="nav-NavLinks" to="/">
          Home
        </NavLink>
        <NavLink className="nav-NavLinks" to="/jobs/:id">
          Single Job
        </NavLink>
        <NavLink className="nav-NavLinks" to="/post-job">
          Post Job
        </NavLink>
        <NavLink className="nav-NavLinks" to="/billing">
          Billing
        </NavLink>
        <NavLink className="nav-NavLinks" to="/account">
          Account
        </NavLink>
        <NavLink className="nav-NavLinks" to="/sign-up">
          Sign Up
        </NavLink>
        <NavLink className="nav-NavLinks" to="/sign-in">
          Sign In
        </NavLink>
        <NavLink className="nav-NavLinks" to="/reset-password">
          Reset Password
        </NavLink>
      </div>
    </nav>
  );
};

export default SideDrawer;
