import React from "react";
import { Link } from "react-router-dom";

const ProfileInfo = props => {
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
      <div className="pic-account">
        <img src={props.company.avatar_image} className="avatar" />
        <h1>Your Account:</h1>
        <div className="border" />
        <button onClick={props.openEditor} className="edit-btn edit">
          Edit Account:
        </button>
      </div>
      <div className="all-company-info">
        <div className="company-text">
          <label>First Name:</label>
          <p>{props.company.first_name}</p>
          <label>Last Name:</label>
          <p>{props.company.last_name}</p>
          <label>Email:</label>
          <p>{props.company.email}</p>
        </div>
        <div className="company-border" />
        <div className="company-text">
          <label>Company name:</label>
          <p>{props.company.company_name}</p>
          <label>Company Summary:</label>
          <p>{props.company.summary}</p>
          <label>Application Email:</label>
          <p>{props.company.application_method}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
