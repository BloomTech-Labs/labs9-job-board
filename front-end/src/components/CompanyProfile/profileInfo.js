import React from "react";
import { Link } from "react-router-dom";

const ProfileInfo = props => {
  return (
    <div className="companyInfo">
      <button onClick={props.openEditor} className="edit-btn edit">
        Edit Account
      </button>
      <div className="pic-account">
        <img src={props.company.avatar_image} className="avatar" />
        <h2>Your Account</h2>
      </div>
      <div class="links-pass-bill">
        <Link to="/billing" className="link-to-pass-bill">
          Billing
        </Link>
        <Link to="/" className="link-to-pass-bill">
          Change Password
        </Link>
      </div>
      <div className="all-company-info">
        <div className="company-text">
          <label>First Name</label>
          <p>{props.company.first_name}</p>
          <label>Last Name</label>
          <p>{props.company.last_name}</p>
          <label>Email</label>
          <p>{props.company.email}</p>
        </div>
        <div className="summary-btns">
          <label>Company name</label>
          <p>{props.company.company_name}</p>
          <label>Company Summary</label>
          <p>{props.company.summary}</p>
          <label>Email for Incoming Applications</label>
          <p>{props.company.application_method}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
