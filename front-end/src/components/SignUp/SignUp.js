import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

import { withFirebase } from "../Firebase/index";

import * as ROUTES from "../../constants/routes";

const URL = process.env.REACT_APP_DB_URL;

// initial state, form submission state reset
const DEFAULT_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

// component for /sign-up route
// if user is already authenticated, redirect to landing
const SignUp = props => {
  return props.authUser ? <Redirect to={ROUTES.LANDING} /> : <SignUpForm />;
};

// SignUpForm without Firebase connectivity
class SignUpFormUnconnected extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_STATE };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  googleAuthSubmit = event => {
    event.preventDefault();

    let user_uid, email;

    this.props.firebase
      .doSignInWithGooglePopUp()
      .then(authUser => {
        if (authUser.user && authUser.user.uid && authUser.user.email) {
          user_uid = authUser.user.uid;
          email = authUser.user.email;

          // checks if in login table
          return axios.post(`${URL}/api/auth/login`, {
            user_uid,
            email
          });
        } else {
          throw new Error("Error authenticating. Please try again.");
        }
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          this.props.history.push(ROUTES.LANDING);
        } else {
          throw new Error("Error verifying login, please try again.");
        }
      })
      .catch(async error => {
        if (error.message) {
          await this.setState({ error });
        }
      });
  };

  emailAuthSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    let user_uid, firebase_email;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        if (authUser.user && authUser.user.uid && authUser.user.email) {
          user_uid = authUser.user.uid;
          firebase_email = authUser.user.email;

          // checks if in login table, creates new row if it isn't
          return axios.post(`${URL}/api/auth/login`, {
            user_uid,
            email: firebase_email
          });
        } else {
          throw new Error("Error creating user. Please try again.");
        }
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          this.props.history.push(ROUTES.LANDING);
        } else {
          throw new Error("Error verifying login, please try again.");
        }
      })
      .catch(async error => {
        if (error.message) {
          await this.setState({ error });
        }
      });
  };

  render() {
    // verifies password and email non-empty, and passwords match
    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === "" ||
      this.state.email === "";

    // passwords match, but not empty
    const passwordMatch =
      this.state.password === this.state.confirmPassword &&
      this.state.password !== "";

    // password/confirmation password not empty
    const passwordNotEmpty =
      this.state.password !== "" && this.state.confirmPassword !== "";

    return (
      <div className="auth-view sign-up-view">
        <div className="auth-container">
          <div className="auth-content">
            <h2 className="auth-heading">Sign Up</h2>
            <span className="auth-tagline">
              Create a profile for your company and connect with talented job
              seekers.
            </span>
            <div className="auth-divider" />
            <form className="auth-form" onSubmit={this.emailAuthSubmit}>
              <input
                type="text"
                name="email"
                className="auth-form-input"
                onChange={this.changeHandler}
                placeholder="Email"
                value={this.state.email}
                autoComplete="on"
              />
              <input
                type="password"
                name="password"
                className="auth-form-input"
                onChange={this.changeHandler}
                placeholder="Password"
                value={this.state.password}
                autoComplete="off"
              />
              <input
                type="password"
                name="confirmPassword"
                className={`auth-form-input${
                  passwordNotEmpty
                    ? passwordMatch
                      ? " match"
                      : " noMatch"
                    : ""
                }`}
                onChange={this.changeHandler}
                placeholder="Confirm Password"
                value={this.state.confirmPassword}
                autoComplete="off"
              />
              {this.state.error ? (
                <span className="auth-error">{this.state.error.message}</span>
              ) : null}
              <button
                className={`auth-form-button${isInvalid ? "" : " active"}`}
                disabled={isInvalid}
                type="submit"
              >
                Sign Up
              </button>
              <div className="auth-or">OR</div>
              <button
                onClick={this.googleAuthSubmit}
                className="google-auth-button"
              >
                Sign up with Google
              </button>
            </form>
            <div className="auth-footer sign-up-footer">
              <span className="left-item">Already have an account?</span>
              <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// connects form to React Router and Firebase
const SignUpForm = withRouter(withFirebase(SignUpFormUnconnected));

export default SignUp;
