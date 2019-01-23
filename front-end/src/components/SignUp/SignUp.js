import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import { withFirebase } from "../Firebase/index";
// import { AuthenticatedUserContext } from "../Session";

import * as ROUTES from "../../constants/routes";

import "./SignUp.css";
import googleButton from "../../images/btn_google_signin_dark_normal_web.png";
import googleButtonPressed from "../../images/btn_google_signin_dark_pressed_web.png";
// import facebookButton from '../../images/facebook-login-btn.png';

// initial state, form submission state reset
const DEFAULT_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

// component for /sign-up route
const SignUp = props => {
  console.log(props.authUser);
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
    this.props.history.push({
      pathname: ROUTES.REDIRECT,
      state: {
        redirectMethod: "google"
      }
    });
  };

  emailAuthSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const createEmailUser = await this.props.firebase.doCreateUserWithEmailAndPassword(
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

  // facebookAuthSubmit = async event => {
  //   event.preventDefault();
  //   try {
  //     const facebookAuth = await this.props.firebase.doSignInWithFacebook();
  //     // ----------- TO DO --------------
  //     // save user info to db
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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
