import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";
import axios from "axios";

import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";
//import { AuthenticatedUserContext } from "../Session";
//import RedirectPage from "../RedirectPage/RedirectPage";

import "./SignIn.css";

import googleButton from "../../images/btn_google_signin_dark_normal_web.png";
import googleButtonPressed from "../../images/btn_google_signin_dark_pressed_web.png";
// import facebookButton from '../../images/facebook-login-btn.png';

const URL = process.env.REACT_APP_DB_URL_TEST;

class SignIn extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.authUser);
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
      .doSignInWithEmailAndPassword(email, password)
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

    try {
      const createEmailUser = await this.props.firebase.doSignInWithEmailAndPassword(
        email,
        password
      );

      if (createEmailUser.user) {
        this.props.history.push({
          pathname: ROUTES.NEW_PROFILE,
          state: {
            user_uid: createEmailUser.user.uid
          }
        });
      } else {
        await this.setState({
          error: "Error signing up new user. Please try again."
        });
      }
    } catch (error) {
      await this.setState({ error });
    }
  };

  render() {
    const isInvalid = this.state.password === "" || this.state.email === "";

    return (
      <div className="sign-in-container">
        <div className="sign-in-header" />
        <form className="sign-in-form" onSubmit={this.emailAuthSubmit}>
          <input
            type="text"
            name="email"
            className="sign-in-form-input"
            onChange={this.changeHandler}
            placeholder="Email"
            value={this.state.email}
            autoComplete="on"
          />
          <input
            type="password"
            name="password"
            className="sign-in-form-input"
            onChange={this.changeHandler}
            placeholder="Password"
            value={this.state.password}
            autoComplete="off"
          />
          {this.state.error ? <span>{this.state.error.message}</span> : null}
          <button
            className={`sign-in-form-button${isInvalid ? "" : " not-disabled"}`}
            disabled={isInvalid}
            type="submit"
          >
            Sign In
          </button>
          <img
            src={googleButton}
            alt="Sign in with Google"
            onClick={this.googleAuthSubmit}
            name="google"
          />
          {/* <img
            src={facebookButton}
            alt="Sign in with Facebook"
            onClick={this.facebookAuthSubmit}
          /> */}
        </form>
        <div className="sign-in-footer">
          <span>
            <Link to={ROUTES.RESET_PASSWORD}>Forgot Password?</Link>
          </span>
          <span>
            New user? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
          </span>
        </div>
      </div>
    );
  }
}

// connects form to React Router and Firebase
const SignInForm = withRouter(withFirebase(SignInFormUnconnected));

export default SignIn;
