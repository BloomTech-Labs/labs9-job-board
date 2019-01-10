import React from "react";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="reset-container">
        <form className="reset-form">
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
        </form>
        <button className="form-button">Reset Password</button>
      </div>
    );
  }
}

export default ResetPassword;
