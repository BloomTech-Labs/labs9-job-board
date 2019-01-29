import React from "react";
import ProfilePic from "./profilePic";
import { Link } from "react-router-dom";

const ProfileForm = props => {
  return (
    <div className="companyInfo">
      <div className="menu-pass-bill">
        <Link to="/billing" className="link-bill">
          Billing
        </Link>
        <Link to="/" className="link-pass">
          Change Password
        </Link>
      </div>
      <button onClick={props.openEditor} className="edit-btn edit">
        <i className="fa fa-pencil" /> Edit Account
      </button>
      <div className="pic-account">
        <ProfilePic setUrl={props.setUrl} />
        <h2>Edit Your Account</h2>
      </div>
      <form onSubmit={props.updateUser} className="update-profile-form">
        <div className="edit-profile-info">
          <label>First Name</label>
          <input
            id="firstName"
            placeholder={props.company.first_name}
            name="firstName"
            type="text"
            value={props.editFirstName}
            onChange={props.changeHandler}
          />
          <label>Last Name</label>
          <input
            id="lastName"
            placeholder={props.company.last_name}
            name="lastName"
            type="text"
            value={props.editLastName}
            onChange={props.changeHandler}
          />
          <label>Email</label>
          <input
            id="email"
            placeholder={props.company.email}
            name="email"
            type="text"
            value={props.editEmail}
            onChange={props.changeHandler}
          />
          <label>Applications Inbox</label>
          <input
            id="applicationInbox"
            placeholder={props.company.application_method}
            name="applicationInbox"
            type="text"
            value={props.editApplicationInbox}
            onChange={props.changeHandler}
          />
        </div>
        <div className="edit-company-info">
          <label>Company Name</label>
          <input
            id="companyName"
            placeholder={props.company.company_name}
            name="companyName"
            type="text"
            value={props.editCompanyName}
            onChange={props.changeHandler}
          />
          <label>Company Summary</label>
          <textarea
            id="companySummary"
            placeholder={props.company.summary}
            name="companySummary"
            type="text"
            value={props.editCompanySummary}
            onChange={props.changeHandler}
          />
          <div className="btns-save-cancel">
            <button
              type="submit"
              onClick={props.updateUser}
              className="edit-btn save"
            >
              Save
            </button>
            <button onClick={props.openEditor} className="edit-btn cancel">
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div className="right-sidebar" />
    </div>
  );
};

export default ProfileForm;
