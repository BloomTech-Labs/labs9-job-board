import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Toolbar.css";

const Toolbar = props => {
  return (
    <header className="toolbar">
      <nav className="toolbar-navigation">
        <div>d</div>
        <div className="toolbar-logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="toolbar-navigation-items">
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
    </header>
  );
};

export default Toolbar;
