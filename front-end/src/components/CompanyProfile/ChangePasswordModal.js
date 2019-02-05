import React from "react";
import { withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase/index";

class ChangePasswordModalUnconnected extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
      uid: "",
      idReceived: false
    };
  }

  componentDidMount() {
    if (this.props.authUser) {
      this.setState({ uid: this.props.authUser.uid, idReceived: true });
    }
  }

  componentDidUpdate() {
    if (this.props.authUser && !this.state.idReceived) {
      this.setState({ uid: this.props.authUser.uid, idReceived: true });
    }
  }

  inputHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = async event => {
    event.preventDefault();

    const response = await this.props.firebase.doPasswordUpdate(
      this.state.currentPassword,
      this.state.newPassword
    );
    console.log("change submit", response);
  };

  render() {
    const emptyInput =
      !this.state.newPassword || !this.state.confirmNewPassword;
    const notMatching =
      this.state.newPassword !== this.state.confirmNewPassword;

    return (
      <div className="change-password-container">
        <div className="change-password-card">
          <form className="auth-form" onSubmit={this.submitHandler}>
            <input
              className="auth-input"
              type="password"
              onChange={this.inputHandler}
              placeholder="Current Password"
              value={this.state.currentPassword}
              name="currentPassword"
            />
            <input
              className="auth-input"
              type="password"
              onChange={this.inputHandler}
              placeholder="New Password"
              value={this.state.newPassword}
              name="newPassword"
            />
            <input
              className="auth-input"
              type="password"
              onChange={this.inputHandler}
              placeholder="Confirm New Password"
              value={this.state.confirmNewPassword}
              name="confirmNewPassword"
            />
            <button
              className="submit-button"
              disabled={emptyInput || notMatching}
              type="submit"
            >
              Submit
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={this.props.toggleModal}
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

const ChangePasswordModal = withRouter(
  withFirebase(ChangePasswordModalUnconnected)
);

export default ChangePasswordModal;
