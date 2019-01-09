import React from "react";
import { Link } from "react-router-dom";

import * as ROUTES from "../../constants/routes";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="sign-in-container">
        <form className="sign-in-form">
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
        </form>
        <button className="form-button">Sign In</button>
        <Link to={ROUTES.RESET_PASSWORD}>Forgot Password?</Link>
        <span>
          New user? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
        </span>
      </div>
    );
  }
}

export default SignIn;
