import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import ProfileForm from "./profileForm";
import ProfileInfo from "./profileInfo";
import NewProfileForm from "./newProfileForm";
import LoadingBar from "../../images/design/png/loading-bar.svg";
import ChangePasswordModal from "./ChangePasswordModal";

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
      uid: "",
      changePasswordVisible: false,
      newProfileModalVisible: false,
      uidChecked: false
    };
  }

  //setting state to account profile
  componentDidMount() {
    if (this.props.authUser) {
      const user_uid = this.props.authUser.uid;
      this.fetchCompany(user_uid);
      this.setState({ uidChecked: true });
    }
  }

  componentDidUpdate() {
    if (this.props.authUser && !this.state.uidChecked) {
      const user_uid = this.props.authUser.uid;
      this.fetchCompany(user_uid);
      this.setState({ uidChecked: true });
    }
  }

  fetchCompany = user_uid => {
    if (user_uid) {
      axios
        .get(`${url}/api/company/${user_uid}`)
        .then(res => {
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
          if (err.response.status === 404) {
            this.openNewProfileModal();
          } else {
            alert(err);
          }
        });
    }
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { changePasswordVisible: !prevState.changePasswordVisible };
    });
  };

  //put request to save edits
  updateUser = e => {
    e.preventDefault();

    const updatedUser = {
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
      .put(`${url}/api/user`, updatedUser)
      .then(res => {
        this.setState({ company: res.data });
      })
      .catch(err => console.log(err));
    this.openEditor();
  };

  //to encourage the user to fillout their info
  openNewProfileModal = () => {
    this.setState({ newProfileModalVisible: true });
  };

  //to close the modal if a user does not want to add their
  //info and push them back to the homepage
  closeNewProfileModal = () => {
    this.props.history.push("/");
  };

  closeModal = () => {
    this.setState({ newProfileModalVisible: false });
    this.componentDidMount();
  };

  //inputs to state
  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  //toggle between edit page and account page
  openEditor = () => {
    this.setState({ companyEditor: !this.state.companyEditor });
  };

  //sets user picture on state
  setUrl = num => {
    this.setState({ image: num[0].url });
  };

  render() {
    return (
      <div className="profile-container">
        {!this.state.company ? (
          this.props.authUser === null ? (
            <Redirect to="/" />
          ) : (
            <div className="loading-container">
              <img src={LoadingBar} alt="loading bar" className="loading" />
            </div>
          )
        ) : this.state.companyEditor ? (
          <ProfileForm
            openEditor={this.openEditor}
            updateUser={this.updateUser}
            setUrl={this.setUrl}
            changeHandler={this.changeHandler}
            company={this.state.company}
            editEmail={this.state.email}
            editFirstName={this.state.firstName}
            editLastName={this.state.lastName}
            editCompanyName={this.state.companyName}
            editCompanySummary={this.state.companySummary}
            editApplicationInbox={this.state.applicationInbox}
            authUser={this.props.authUser}
            toggleModal={this.toggleModal}
          />
        ) : (
          <ProfileInfo
            company={this.state.company}
            openEditor={this.openEditor}
            authUser={this.props.authUser}
            toggleModal={this.toggleModal}
          />
        )}
        {this.state.changePasswordVisible ? (
          <ChangePasswordModal toggleModal={this.toggleModal} />
        ) : null}

        {this.state.newProfileModalVisible ? (
          <NewProfileForm
            authUser={this.props.authUser}
            openNewProfileModal={this.openNewProfileModal}
            closeNewProfileModal={this.closeNewProfileModal}
            closeModal={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

export default UpdateProfile;
