import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import ProfilePic from "./profilePic";

const url = process.env.REACT_APP_DB_URL;

class NewProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uid: "",
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      companySummary: "",
      applicationInbox: "",
      image: ""
    };
  }

  componentDidUpdate() {
    if (this.props.authUser.uid !== this.state.uid) {
      this.setState({ uid: this.props.authUser.uid });
    }
  }

  //take user id passed from initial sign up
  //post new user information to that id

  addNew = e => {
    e.preventDefault();

    const newUser = {
      user_uid: this.state.uid,
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      company_name: this.state.companyName,
      summary: this.state.companySummary,
      application_method: this.state.applicationInbox,
      avatar_image:
        this.state.image || "https://i.ibb.co/d45NRww/default-avatar.png" // default avatar img
    };

    axios
      .post(`${url}/api/users`, newUser)
      .then(response => {
        if (response) {
          this.props.closeModal();
          // this.props.closeNewProfileModal();
        } else {
          throw new Error();
        }
      })
      .catch(error => {
        alert("Error adding user to database");
      });
  };

  //removes double scroll bar when modal appears
  componentWillMount() {
    document.body.style.overflow = "hidden";
  }

  //displays orginial scroll bar
  componentWillUnmount() {
    document.body.style.overflow = null;
  }

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setUrl = num => {
    this.setState({ image: num[0].url });
  };

  render() {
    return (
      <div className="new-profile-view">
        <div className="new-profile-container">
          <div
            className="close-button"
            onClick={() => this.props.closeNewProfileModal()}
          >
            x
          </div>
          <h2>New Account Info</h2>
          <h4>Tell us about your company.</h4>
          <div className="header-divider" />
          <ProfilePic setUrl={this.setUrl} />

          <form className="new-user-form" onSubmit={this.addNew}>
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="First Name"
              value={this.state.firstName}
              name="firstName"
              className="new-user-input-half"
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Last Name"
              value={this.state.lastName}
              name="lastName"
              className="new-user-input-half"
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Email"
              value={this.state.email}
              name="email"
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Company Name"
              value={this.state.companyName}
              name="companyName"
            />
            <textarea
              type="text"
              onChange={this.handleInputChange}
              placeholder="Company Summary"
              value={this.state.companySummary}
              name="companySummary"
            />
            <input
              type="text"
              onChange={this.handleInputChange}
              placeholder="Application Inbox"
              value={this.state.applicationInbox}
              name="applicationInbox"
            />
            <div className="button-container">
              <button className="new-profile-button save-button" type="submit">
                Save
              </button>
              <button
                className="new-profile-button cancel-button"
                type="button"
                onClick={() => this.props.closeNewProfileModal()}
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

export default withRouter(NewProfileForm);
