import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import axios from "axios";

import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";

// import "./SignIn.scss";

const URL = process.env.REACT_APP_DB_URL;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return this.props.authUser ? (
      <Redirect to={ROUTES.LANDING} />
    ) : (
      <SignInForm />
    );
  }
}

const DEFAULT_STATE = {
  email: "",
  password: "",
  redirect: false,
  error: null
};

class SignInFormUnconnected extends React.Component {
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
          throw { message: "Error authenticating. Please try again." };
        }
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          this.props.history.push(ROUTES.LANDING);
        } else {
          throw { message: "Error verifying login, please try again." };
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
      .doSignInWithEmailAndPassword(email, password)
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
          throw { message: "Error creating user. Please try again." };
        }
      })
      .then(response => {
        if (response.status === 200 || response.status === 201) {
          this.props.history.push(ROUTES.LANDING);
        } else {
          throw { message: "Error verifying login, please try again." };
        }
      })
      .catch(async error => {
        if (error.message) {
          await this.setState({ error });
        }
      });
  };

  render() {
    const isInvalid = this.state.password === "" || this.state.email === "";

    return (
      <div className="auth-view sign-in-view">
        <div className="auth-container">
          <div className="auth-content">
            <h2 className="auth-heading">Sign In</h2>
            <span className="auth-tagline">
              Discover top talent. Meet your future employees.
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
              {this.state.error ? (
                <span className="auth-error">{this.state.error.message}</span>
              ) : null}
              <button
                className={`auth-form-button${
                  isInvalid ? "" : " not-disabled"
                }`}
                disabled={isInvalid}
                type="submit"
              >
                Sign In
              </button>
              <div className="auth-or">OR</div>
              <button
                onClick={this.googleAuthSubmit}
                className="google-auth-button"
              >
                <span className="google-auth-button-">Sign in with Google</span>
              </button>
            </form>
            <div className="auth-footer sign-in-footer">
              <span>
                <Link to={ROUTES.RESET_PASSWORD}>Forgot Password?</Link>
              </span>
              <span>
                New user? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// connects form to React Router and Firebase
const SignInForm = withRouter(withFirebase(SignInFormUnconnected));

export default SignIn;
