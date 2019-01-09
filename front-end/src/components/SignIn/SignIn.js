import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
          <label className="sign-in-label">
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
          <label className="sign-in-label">
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
        <Link to="/forgot-password">Forgot Password?</Link>
        <span>
          New user? <Link to="/signup">Sign Up</Link>
        </span>
      </div>
    );
  }
}

export default SignIn;
