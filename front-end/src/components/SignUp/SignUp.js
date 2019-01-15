import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import { withFirebase } from "../Firebase/index";
import { AuthenticatedUserContext } from '../Session';

import * as ROUTES from "../../constants/routes";

import "./SignUp.css";
import googleButton from "../../images/btn_google_signin_dark_normal_web.png";
import googleButtonPressed from "../../images/btn_google_signin_dark_pressed_web.png";
import facebookButton from '../../images/facebook-login-btn.png';

// initial state, form submission state reset
const DEFAULT_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

// component for /sign-up route
const SignUp = () => {
  return (
    <AuthenticatedUserContext.Consumer>
      {authenticatedUser => authenticatedUser ?
        <Redirect to={ROUTES.LANDING} />
        :
        < SignUpForm />
      }
    </AuthenticatedUserContext.Consumer>
  );
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

  googleAuthSubmit = async event => {
    event.preventDefault();
    event.target.setAttribute("src", googleButtonPressed);
    try {
      const googleAuth = await this.props.firebase.doSignInWithGoogle();
      // ----------- TO DO --------------
      // save user info to db
    } catch (error) {
      console.log(error);
    }
  };

  facebookAuthSubmit = async event => {
    event.preventDefault();
    try {
      const facebookAuth = await this.props.firebase.doSignInWithFacebook();
      // ----------- TO DO --------------
      // save user info to db
    } catch (error) {
      console.log(error);
    }
  };

  submitHandler = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      await this.props.firebase.doCreateUserWithEmailAndPassword(
        email,
        password
      );
      await this.setState({ ...DEFAULT_STATE });
      this.props.history.push(ROUTES.LANDING);
    } catch (error) {
      await this.setState({ error });
    }
  };

  render() {
    // verifies password and email non-empty
    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === "" ||
      this.state.email === "";

    return (
      <div className="sign-up-container">
        <div className="sign-up-header"></div>
        <form className="sign-up-form" onSubmit={this.submitHandler}>
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
          <button className={`sign-up-form-button${isInvalid ? '' : ' not-disabled'}`} disabled={isInvalid} type="submit">
            Sign Up
          </button>
          <img
            src={googleButton}
            alt="Sign in with Google"
            onClick={this.googleAuthSubmit}
          />
          <img
            src={facebookButton}
            alt="Sign in with Facebook"
            onClick={this.facebookAuthSubmit}
          />
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
