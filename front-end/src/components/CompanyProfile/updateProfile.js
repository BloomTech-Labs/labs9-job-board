import React, { Component } from "react";
import axios from "axios";
import ProfileForm from "./profileForm";
// import ProfilePic from './profilePic';

const url = process.env.REACT_APP_DB_URL;

class UpdateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: null,
      companyEditor: false,
      image: "",
      email: "",
      firstName: "",
      lastName: "",
      companyName: "",
      companySummary: "",
      applicationInbox: "",
      uid: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      const user_uid = this.props.authUser.uid;
      this.fetchCompany(user_uid);
    }, 1000);
  }

  fetchCompany = user_uid => {
    if (user_uid) {
      axios
        .get(`${url}/api/company/${user_uid}`)
        .then(res => {
          console.log("get response", res);
          this.setState(() => ({
            company: res.data
          }));
        })
        .then(() => {
          this.setState({
            email: this.state.company.email,
            firstName: this.state.company.first_name,
            lastName: this.state.company.last_name,
            companyName: this.state.company.company_name,
            companySummary: this.state.company.summary,
            applicationInbox: this.state.company.application_method,
            uid: this.state.company.user_uid,
            image: this.state.company.avatar_image
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  updateUser = e => {
    e.preventDefault();
    const id = this.props.match.params.id;

    const updatedUser = {
      user_uid: this.state.uid,
      email: this.state.email,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      company_name: this.state.companyName,
      summary: this.state.companySummary,
      application_method: this.state.applicationInbox
    };

    axios
      .put(`${url}/api/user`, updatedUser)
      .then(res => {
        console.log("response", res);
        this.setState({ company: res.data });
      })
      .catch(err => console.log(err));
    this.openEditor();
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  openEditor = () => {
    this.setState({ companyEditor: !this.state.companyEditor });
  };

  setUrl = event => {
    this.setState({ image: event.target.value });
  };

  render() {
    console.log(this.state);
    if (!this.state.company) {
      return <div>Loading.....</div>;
    }
    return (
      <div className="profile-container">
        <p onClick={this.openEditor}>Edit Profile</p>
        {this.state.companyEditor ? (
          <ProfileForm
            setUrl={this.state.setUrl}
            updateUser={this.updateUser}
            changeHandler={this.changeHandler}
            company={this.state.company}
            editEmail={this.state.email}
            editFirstName={this.state.firstName}
            editLastName={this.state.lastName}
            editCompanyName={this.state.companyName}
            editCompanySummary={this.state.companySummary}
            editApplicationInbox={this.state.applicationInbox}
          />
        ) : (
          <h2>{this.state.company.company_name}</h2>
        )}
        {this.state.companyEditor ? null : <p>{this.state.company.email}</p>}
        {this.state.companyEditor ? null : <p>{this.state.company.balance}</p>}
        {this.state.companyEditor ? null : (
          <p>{this.state.company.first_name}</p>
        )}
        {this.state.companyEditor ? null : (
          <p>{this.state.company.last_name}</p>
        )}
        {this.state.companyEditor ? null : <p>{this.state.company.summary}</p>}
        {this.state.companyEditor ? null : (
          <p>{this.state.company.application_method}</p>
        )}
        {this.state.companyEditor ? null : (
          <p>{this.state.company.avatar_image}</p>
        )}
      </div>
    );
  }
}

export default UpdateProfile;
