import React from "react";
import { Link, withRouter, Redirect } from "react-router-dom";

import { withFirebase } from "../Firebase/index";
import ResetPasswordModal from "./ResetPasswordModal";
import * as ROUTES from "../../constants/routes";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible
    }));
  };

  render() {
    return this.props.authUser ? (
      <Redirect to={ROUTES.LANDING} />
    ) : (
      <ResetPasswordForm toggleModal={this.toggleModal} />
    );
  }
}

const DEFAULT_STATE = {
  email: "",
  error: null
};

class ResetPasswordFormUnconnected extends React.Component {
  constructor(props) {
    super(props);
    this.state = { ...DEFAULT_STATE };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitHandler = async event => {
    event.preventDefault();

    const { email } = this.state;

    try {
      await this.props.firebase.doPasswordReset(email);
      await this.setState({ ...DEFAULT_STATE });
      this.props.toggleModal();
    } catch (error) {
      this.setState({ error });
    }
  };

  render() {
    const invalidInput = this.state.email === "";

    return (
      <div className="reset-view">
        <div className="reset-container">
          <div className="reset-content">
            <h2 className="reset-heading">Reset Password</h2>
            <span className="reset-tagline">
              Check your email after you submit the form.
            </span>
            <div className="auth-divider" />
            <form className="reset-form" onSubmit={this.submitHandler}>
              <input
                type="text"
                name="email"
                className="reset-form-input"
                onChange={this.changeHandler}
                placeholder="Email"
                value={this.state.email}
                autoComplete="on"
              />
              <button
                className={`reset-form-button${
                  invalidInput ? "" : " not-disabled"
                }`}
                disabled={invalidInput}
              >
                Reset Password
              </button>
              {this.state.error ? (
                <span>{this.state.error.message}</span>
              ) : null}
            </form>
            <div className="reset-footer">
              <span>
                Remember your password? <Link to={ROUTES.SIGN_IN}>Sign In</Link>
              </span>
            </div>
          </div>
        </div>
        {this.state.modalVisible ? (
          <ResetPasswordModal modalVisible={this.state.modalVisible} />
        ) : null}
      </div>
    );
  }
}

export default ResetPassword;

const ResetPasswordForm = withRouter(
  withFirebase(ResetPasswordFormUnconnected)
);

export { ResetPasswordForm };
