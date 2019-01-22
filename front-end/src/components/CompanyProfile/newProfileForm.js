import React, { Component } from "react";
import axios from "axios";
import ProfilePic from "./profilePic";
import "./newProfileFormStyling.css"

const url = process.env.REACT_APP_DB_URL;

class NewProfileForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: "",
        firstName: "",
        lastName: "",
        companyName: "",
        companySummary: "",
        applicationInbox: ""
      };
  }

  componentDidMount() {
    console.log(this.props.authUser);
  }


  addNew = e => {
    e.preventDefault();

    const newUser = {
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      companyName: this.state.companyName,
      companySummary: this.state.companySummary,
      applicationInbox: this.state.applicationInbox
    };

    axios
      .post(`${url}/api/users`, newUser)
      .then(res => {
        console.log("ADDING USER", res);
      
      })
      .catch(error => {
        console.log("ERROR", error);
      });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className = 'full-page'>
        <form className="new-user-form" onSubmit={this.addNew}>
          <h2> Tell us about you! </h2>
          <input
            type="text"
            className="input firstNameHolder"
            onChange={this.handleInputChange}
            placeholder="First Name"
            value={this.state.firstName}
            name="firstName"
          />
          <input
            type="text"
            className="input lastNameHolder"
            onChange={this.handleInputChange}
            placeholder="Last Name"
            value={this.state.lastName}
            name="lastName"
          />
          <input
            type="text"
            className="input emailHolder"
            onChange={this.handleInputChange}
            placeholder="Email"
            value={this.state.email}
            name="email"
          />
          <input
            type="text"
            className="input companyNameHolder"
            onChange={this.handleInputChange}
            placeholder="Company Name"
            value={this.state.companyName}
            name="companyName"
          />
          <textarea
            type="text"
            className="input companySummaryHolder"
            onChange={this.handleInputChange}
            placeholder="Company Summary"
            value={this.state.companySummary}
            name="companySummary"
          />
          <input
            type="text"
            className="input applicationInboxHolder"
            onChange={this.handleInputChange}
            placeholder="Application Inbox"
            value={this.state.applicationInbox}
            name="applicationInbox"
          />

          <button type="submit">Save</button>
        </form>
        <ProfilePic />
      </div>
    );
  }
}

export default NewProfileForm;
