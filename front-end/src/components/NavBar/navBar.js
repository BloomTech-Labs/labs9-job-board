import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import EmployerLogin from "./employerLogin";

const NavBar = props => {
  return (
    <div className="nav-bar">
      <Link to="/">
        <h1 className="logo">Knowledge Without College!</h1>
      </Link>
      <EmployerLogin />
    </div>
  );
};

export default NavBar;
