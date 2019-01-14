import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";

import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";

import googleButton from "../../images/btn_google_signin_dark_normal_web.png";
import googleButtonPressed from "../../images/btn_google_signin_dark_pressed_web.png";
import facebookButton from '../../images/facebook-login-btn.png';

const SignIn = props => {
  return props.authenticatedUser ? <Redirect to={ROUTES.LANDING} /> : <SignInForm />;
};

const DEFAULT_STATE = {
  email: "",
  password: "",
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
      await this.props.firebase.doSignInWithEmailAndPassword(email, password);
      await this.setState({ ...DEFAULT_STATE });
      this.props.history.push(ROUTES.LANDING);
    } catch (error) {
      await this.setState({ error });
    }
  };

  render() {
    const isInvalid = this.state.password === "" || this.state.email === "";

    return (
      <div className="sign-in-container">
        <form className="sign-in-form" onSubmit={this.submitHandler}>
          <label className="form-label">
            Email:
            <input
              type="text"
              name="email"
              className="form-input"
              onChange={this.changeHandler}
              placeholder="Email"
              value={this.state.email}
              autoComplete="on"
            />
          </label>
          <label className="form-label">
            Password:
            <input
              type="password"
              name="password"
              className="form-input"
              onChange={this.changeHandler}
              placeholder="Password"
              value={this.state.password}
              autoComplete="off"
            />
          </label>
          <button className="form-button" disabled={isInvalid} type="submit">
            Sign In
          </button>
          {this.state.error ? <span>{this.state.error.message}</span> : null}
        </form>
        <Link to={ROUTES.RESET_PASSWORD}>Forgot Password?</Link>
        <span>
          New user? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </span>
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
      </div>
    );
  }
}

// connects form to React Router and Firebase
const SignInForm = withRouter(withFirebase(SignInFormUnconnected));

export default SignIn;
