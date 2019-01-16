import React from "react";
import { Link } from "react-router-dom";
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
          <ul>
            <li>
              <Link className="nav-links" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/jobs/:id">
                Single Job
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/post-job">
                Post Job
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/billing">
                Billing
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/account">
                Account
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/sign-up">
                Sign Up
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/sign-in">
                Sign In
              </Link>
            </li>
            <li>
              <Link className="nav-links" to="/reset-password">
                Reset Password
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Toolbar;
