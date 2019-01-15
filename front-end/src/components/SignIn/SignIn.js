import React from "react";
import { withRouter, Link, Redirect } from "react-router-dom";

import { withFirebase } from "../Firebase/index";
import * as ROUTES from "../../constants/routes";
import { AuthenticatedUserContext } from '../Session';

import "./SignIn.css";

import googleButton from "../../images/btn_google_signin_dark_normal_web.png";
import googleButtonPressed from "../../images/btn_google_signin_dark_pressed_web.png";
import facebookButton from '../../images/facebook-login-btn.png';

const SignIn = () => {
  return (
    <AuthenticatedUserContext.Consumer>
      {authenticatedUser => authenticatedUser ?
        <Redirect to={ROUTES.LANDING} />
        :
        < SignInForm />
      }
    </AuthenticatedUserContext.Consumer>
  );
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
        <div className="sign-in-header"></div>
        <form className="sign-in-form" onSubmit={this.submitHandler}>
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
          <button className={`sign-in-form-button${isInvalid ? '' : ' not-disabled'}`} disabled={isInvalid} type="submit">
            Sign In
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
        </form>
        <div className="sign-in-footer">
          <span><Link to={ROUTES.RESET_PASSWORD}>Forgot Password?</Link></span>
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
