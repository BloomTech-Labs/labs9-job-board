import React from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

const EmployerLogin = props => {
  return (
    <div className="employer-login-container">
      <div className="employer-login">
        <h3>EMPLOYER</h3>
        <Link to="/sign-in">
          <button>Sign In</button>
        </Link>
        <Link to="/sign-up">
          <button>Sign Up</button>
        </Link>
      </div>
    </div>
  );
};

export default EmployerLogin;
