import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";
import Routes from "../Routes/Routes";

// <div className="employer-login-container">
//   <h3>Employers</h3>
//   <div className="login-buttons-container">
//     <Link to="/sign-in">Log In</Link>
//     <Link to="/sign-up">Sign Up</Link>
//   </div>
// </div>

const EmployerLogin = props => {
  return (
    <div class="hamburger">
      <label for="toggle">&#9776;</label>
      <input type="checkbox" id="toggle" />
      <div class="menu">
        <Link className="nav-links" to="/">
          Home
        </Link>
        <Link className="nav-links" to="/jobs/:id">
          Single Job
        </Link>
        <Link className="nav-links" to="/post-job">
          Post Job
        </Link>
        <Link className="nav-links" to="/billing">
          Billing
        </Link>
        <Link className="nav-links" to="/account">
          Account
        </Link>
        <Link className="nav-links" to="/sign-up">
          Sign Up
        </Link>
        <Link className="nav-links" to="/sign-in">
          Sign In
        </Link>
        <Link className="nav-links" to="/reset-password">
          Reset Password
        </Link>
      </div>
    </div>
  );
};

export default EmployerLogin;
