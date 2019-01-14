import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const EmployerLogin = props => {
  return (
    <div className="employer-login-container">
      <h3>Employers</h3>
      <div className="login-buttons-container">
        <a href="/sign-in">Log In</a>
        <a href="/sign-up">Sign Up</a>
      </div>
    </div>
  );
};

export default EmployerLogin;
