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
      idReceived: false,
      alert: ""
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

    try {
      const response = await this.props.firebase.doPasswordUpdate(
        this.state.currentPassword,
        this.state.newPassword
      );

      if (!response) {
        await this.setState({
          alert: { message: "Successfully updated password" }
        });
        setTimeout(() => this.props.toggleModal(), 2000);
      } else {
        await this.setState({ alert: response });
      }
    } catch (error) {
      if (error.message) {
        this.setState({ alert: error });
      } else {
        this.setState({ alert: { message: "Error changing password" } });
      }
    }
  };

  render() {
    const emptyInput =
      !this.state.newPassword || !this.state.confirmNewPassword;
    const notMatching =
      this.state.newPassword !== this.state.confirmNewPassword;

    return (
      <div className="change-password-container">
        <div className="change-password-card">
          <div
            className="close-button"
            onClick={() => this.props.toggleModal()}
          >
            x
          </div>
          <h2>Change Password</h2>
          <h4>Out with the old. In with the new.</h4>
          <div className="header-divider" />
          <form className="change-password-form" onSubmit={this.submitHandler}>
            <input
              type="password"
              onChange={this.inputHandler}
              placeholder="Current Password"
              value={this.state.currentPassword}
              name="currentPassword"
              autoComplete="false"
            />
            <input
              type="password"
              onChange={this.inputHandler}
              placeholder="New Password"
              value={this.state.newPassword}
              name="newPassword"
              autoComplete="false"
            />
            <input
              className={`${
                !emptyInput ? (!notMatching ? " match" : " noMatch") : ""
              }`}
              type="password"
              onChange={this.inputHandler}
              placeholder="Confirm New Password"
              value={this.state.confirmNewPassword}
              name="confirmNewPassword"
              autoComplete="false"
            />
            {this.state.alert.message ? (
              <span className="change-password-error">
                {this.state.alert.message}
              </span>
            ) : null}
            <div className="button-container">
              <button
                className={`change-password-button save-button${
                  emptyInput || notMatching ? "" : " active"
                }`}
                disabled={emptyInput || notMatching}
                type="submit"
              >
                Submit
              </button>
              <button
                type="button"
                className="change-password-button cancel-button"
                onClick={this.props.toggleModal}
              >
                Cancel
              </button>
            </div>
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
