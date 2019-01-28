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
      avatar_image: this.state.image
    };

    axios
      .post(`${url}/api/users`, newUser)
      .then(res => {
        console.log("ADDING USER", res);
        this.props.history.push("");
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  setUrl = num => {
    this.setState({ image: num[0].url });
  };

  render() {
    if (this.props.authUser) {
      console.log(this.state.uid);
    }

    return (
      <div className="full-page">
        <form className="new-user-form" onSubmit={this.addNew}>
          <h2> Tell us about you! </h2>
          <ProfilePic setUrl={this.setUrl} />
          <p className="required-field">* indicates required fields</p>
          <input
            type="text"
            onChange={this.handleInputChange}
            placeholder="*First Name"
            value={this.state.firstName}
            name="firstName"
          />
          <input
            type="text"
            onChange={this.handleInputChange}
            placeholder="*Last Name"
            value={this.state.lastName}
            name="lastName"
          />
          <input
            type="text"
            onChange={this.handleInputChange}
            placeholder="*Email"
            value={this.state.email}
            name="email"
          />
          <input
            type="text"
            onChange={this.handleInputChange}
            placeholder="*Company Name"
            value={this.state.companyName}
            name="companyName"
          />
          <textarea
            type="text"
            onChange={this.handleInputChange}
            placeholder="*Company Summary"
            value={this.state.companySummary}
            name="companySummary"
          />
          <input
            type="text"
            onChange={this.handleInputChange}
            placeholder="*Application Inbox"
            value={this.state.applicationInbox}
            name="applicationInbox"
          />
          <button className="save-button" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default withRouter(NewProfileForm);
