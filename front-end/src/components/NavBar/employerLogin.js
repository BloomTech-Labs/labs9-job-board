import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const EmployerLogin = props => {
  return (
    <div className="employer-login-container">
      <h3>Employers</h3>
      <div className="login-buttons-container">
        <Link to="/sign-in">Log In</Link>
        <Link to="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
};

export default EmployerLogin;
