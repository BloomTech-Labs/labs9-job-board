import React from "react";
import ProfilePic from "./profilePic";
import { Link } from "react-router-dom";

const ProfileForm = props => {
  return (
    <div className="update-profile-page">
      <form className="update-profile-form">
        <label>First Name</label>
        <input
          id="firstName"
          placeholder={props.company.first_name}
          name="firstName"
          type="text"
          value={props.editFirstName}
          onChange=""
        />
        <label>Last Name</label>
        <input
          id="lastName"
          placeholder={props.company.last_name}
          name="lastName"
          type="text"
          value={props.editLastName}
          onChange=""
        />
        <label>Email</label>
        <input
          id="email"
          placeholder={props.company.email}
          name="email"
          type="text"
          value={props.editEmail}
          onChange=""
        />
        />
        <label>Company Name</label>
        <input
          id="companyName"
          placeholder={props.company.company_name}
          name="companyName"
          type="text"
          value={props.editCompanyName}
          onChange=""
        />
        <label>Company Summary</label>
        <textarea
          id="companySummary"
          placeholder={props.company.summary}
          name="companySummary"
          type="text"
          value={props.editCompanySummary}
          onChange=""
        />
        <label>Applications Inbox</label>
        <input
          id="applicationInbox"
          placeholder={props.company.application_method}
          name="applicationInbox"
          type="text"
          value={props.editApplicationInbox}
          onChange=""
        />
        <button type="submit"> Save </button>
      </form>
      <div className="right-sidebar">
        <ProfilePic />
        <button className="update-password right-button">
          Change Password{" "}
        </button>
        <Link to="/billing" className="right-button">
          Billing and Jobs
        </Link>
      </div>
    </div>
  );
};

export default ProfileForm;
