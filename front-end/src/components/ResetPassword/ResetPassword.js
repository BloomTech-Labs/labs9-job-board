import React from "react";
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase/index';
import ResetPasswordModal from './ResetPasswordModal';
import * as ROUTES from '../../constants/routes';

import "./ResetPassword.css";

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    }
  }

  toggleModal = () => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible
    }));
  }

  render() {
    return (
      <div className="reset-password">
        <ResetPasswordForm toggleModal={this.toggleModal} />
        {this.state.modalVisible ? <ResetPasswordModal modalVisible={this.state.modalVisible} /> : null}
      </div>
    )
  }
}

const DEFAULT_STATE = {
  email: '',
  error: null
}

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
  }

  render() {
    const invalidInput = (this.state.email === '');

    return (
      <div className="reset-container">
        <form className="reset-form" onSubmit={this.submitHandler}>
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
          <button className="form-button" disabled={invalidInput}>Reset Password</button>
          {this.state.error ? <span>{this.state.error.message}</span> : null}
        </form>
      </div>
    );
  }
}

export default ResetPassword;

const ResetPasswordForm = withFirebase(ResetPasswordFormUnconnected);

export { ResetPasswordForm };
