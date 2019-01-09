import React from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase/index";

import * as ROUTES from "../../constants/routes";

// initial state, form submission state reset
const DEFAULT_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

// component for /sign-up route
const SignUp = props => {
  return <SignUpForm />;
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
    // verifies that passwords match, password and email non-empty
    const isInvalid =
      this.state.password !== this.state.confirmPassword ||
      this.state.password === "" ||
      this.state.email === "";

    return (
      <div className="sign-up-container">
        <form className="sign-up-form" onSubmit={this.submitHandler}>
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
          <label className="form-label">
            Confirm Password:
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              onChange={this.changeHandler}
              placeholder="Confirm Password"
              value={this.state.confirmPassword}
              autoComplete="off"
            />
          </label>
          <button className="form-button" disabled={isInvalid} type="submit">
            Sign Up
          </button>
          {this.state.error ? <span>{this.state.error.message}</span> : null}
        </form>
      </div>
    );
  }
}

// connects form to React Router and Firebase
const SignUpForm = withRouter(withFirebase(SignUpFormUnconnected));

export default SignUp;
