import React from "react";

const DEFAULT_STATE = {
  email: "",
  password: "",
  confirmPassword: "",
  error: null
};

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_STATE };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = event => {};

  render() {
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
        </form>
        <button className="form-button" disabled={isInvalid}>
          Sign Up
        </button>
        {this.state.error ? <span>{this.state.error.message}</span> : null}
      </div>
    );
  }
}

export default SignUp;
