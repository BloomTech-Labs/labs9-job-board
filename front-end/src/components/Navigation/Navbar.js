import React from "react";
import { Link } from "react-router-dom";
import "./NavigationStyles.css";
import SideMenuToggleButton from "./SideMenuToggleButton";

const Navbar = props => {
  return (
    <header className="navbar">
      <nav className="navbar-navigation">
        <div>
          <SideMenuToggleButton click={props.sideMenuToggleClickHandler} />
        </div>
        <div className="navbar-logo">
          <Link to="/">Knowledge Without College!</Link>
        </div>
        {/* <div className="navbar-navigation-items"> */}
        {/* <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs/:id">Single Job</NavLink>
          <NavLink to="/post-job">Post Job</NavLink>
          <NavLink to="/billing">Billing</NavLink>
          <NavLink to="/account">Account</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          <NavLink to="/sign-in">Sign In</NavLink>
          <NavLink to="/reset-password">Reset Password</NavLink> */}
        {/* </div> */}
      </nav>
    </header>
  );
};

export default Navbar;
