import React from "react";
import ProfilePic from "./profilePic";
import { Link } from "react-router-dom";

const ProfileForm = props => {
  return (
    <div className="update-profile-page">
      <form className="update-profile-form">
        <label>First Name</label>
        <input id="firstName" placeholder="John" />
        <label>Last Name</label>
        <input id="lastName" placeholder="Doe" />
        <label>Email</label>
        <input id="email" placeholder="user@gmail.com" />
        <label>Company Name</label>
        <input id="companyName" placeholder="Lambda Technologies" />
        <label>Company Summary</label>
        <textarea
          id="companySummary"
          placeholder="Briefley describe your company for your potential employees"
        />
        <label>Applications Inbox</label>
        <input id="applicationInbox" placeholder="apply@company.com" />
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
