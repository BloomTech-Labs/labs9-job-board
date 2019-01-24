import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";
import axios from "axios";

import { withFirebase } from "../Firebase/index";
// import { AuthenticatedUserContext } from "../Session";

import * as ROUTES from "../../constants/routes";

import "./SignUp.css";
import googleButton from "../../images/btn_google_signin_dark_normal_web.png";
import googleButtonPressed from "../../images/btn_google_signin_dark_pressed_web.png";
// import facebookButton from '../../images/facebook-login-btn.png';

const URL = process.env.REACT_APP_DB_URL;

// initial state, form submission state reset
const DEFAULT_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

// component for /sign-up route
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
    event.target.setAttribute("src", googleButtonPressed);

    let user_uid, email;

    this.props.firebase
      .doSignInWithGooglePopUp()
      .then(authUser => {
        console.log("authUser", authUser);
        if (authUser.user && authUser.user.uid && authUser.user.email) {
          user_uid = authUser.user.uid;
          email = authUser.user.email;

          // checks if in login table
          return axios.post(`${URL}/api/auth/login`, {
            user_uid,
            email
          });
        } else {
          this.props.history.push(ROUTES.LANDING);
          throw "break promise";
        }
      })
      .then(response => {
        console.log("firstlogin", response);
        if (response.data.action === "check user table") {
          return axios.post(`${URL}/api/auth/hasAccountInfo`, {
            user_uid,
            email
          });
        } else {
          this.props.history.push({
            pathname: ROUTES.NEW_PROFILE,
            state: {
              uid: user_uid
            }
          });
          throw "break promise";
        }
      })
      .then(response => {
        console.log("users table", response);
        if (response.action === "redirect to landing") {
          this.props.history.push(ROUTES.LANDING);
        } else {
          this.props.history.push({
            pathname: ROUTES.NEW_PROFILE,
            state: {
              uid: user_uid
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  emailAuthSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    let user_uid, firebase_email;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        console.log("authUser", authUser);
        if (authUser.user && authUser.user.uid && authUser.user.email) {
          user_uid = authUser.user.uid;
          firebase_email = authUser.user.email;

          // checks if in login table
          return axios.post(`${URL}/api/auth/login`, {
            user_uid,
            email: firebase_email
          });
        } else {
          this.props.history.push(ROUTES.LANDING);
          throw "break promise";
        }
      })
      .then(response => {
        console.log("firstlogin", response);
        if (response.data.action === "check user table") {
          return axios.post(`${URL}/api/auth/hasAccountInfo`, {
            user_uid,
            email: firebase_email
          });
        } else {
          this.props.history.push({
            pathname: ROUTES.NEW_PROFILE,
            state: {
              uid: user_uid
            }
          });
          throw "break promise";
        }
      })
      .then(response => {
        console.log("users table", response);
        if (response.data.action === "redirect to landing") {
          this.props.history.push(ROUTES.LANDING);
        } else {
          this.props.history.push({
            pathname: ROUTES.NEW_PROFILE,
            state: {
              uid: user_uid
            }
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    // verifies password and email non-empty
    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === "" ||
      this.state.email === "";

    return (
      <div className="sign-up-container">
        <div className="sign-up-header" />
        <form className="sign-up-form" onSubmit={this.emailAuthSubmit}>
          <input
            type="text"
            name="email"
            className="sign-up-form-input"
            onChange={this.changeHandler}
            placeholder="Email"
            value={this.state.email}
            autoComplete="on"
          />
          <input
            type="password"
            name="password"
            className="sign-up-form-input"
            onChange={this.changeHandler}
            placeholder="Password"
            value={this.state.password}
            autoComplete="off"
          />
          <input
            type="password"
            name="confirmPassword"
            className="sign-up-form-input"
            onChange={this.changeHandler}
            placeholder="Confirm Password"
            value={this.state.confirmPassword}
            autoComplete="off"
          />
          <button
            className={`sign-up-form-button${isInvalid ? "" : " not-disabled"}`}
            disabled={isInvalid}
            type="submit"
          >
            Sign Up
          </button>
          <img
            src={googleButton}
            alt="Sign in with Google"
            onClick={this.googleAuthSubmit}
          />
          {/* <img
            src={facebookButton}
            alt="Sign in with Facebook"
            onClick={this.facebookAuthSubmit}
          /> */}
          {this.state.error ? <span>{this.state.error.message}</span> : null}
        </form>
        <span>
          Already have an account? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </span>
      </div>
    );
  }
}

// connects form to React Router and Firebase
const SignUpForm = withRouter(withFirebase(SignUpFormUnconnected));

export default SignUp;
