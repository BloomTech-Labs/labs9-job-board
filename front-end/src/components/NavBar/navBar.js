import React from "react";
import "./navBar.css";
import EmployerLogin from "./employerLogin";

const NavBar = props => {
  return (
    <div className="nav-bar">
      <EmployerLogin />
    </div>
  );
};

export default NavBar;
