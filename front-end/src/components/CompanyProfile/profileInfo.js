import React from "react";

const ProfileInfo = props => {
  return (
    <div className="companyInfo">
      <div className="pic-account">
        <img src={props.company.avatar_image} className="avatar" />
        <h2>Your Account</h2>
      </div>
      <div className="all-company-info">
        <div className="company-text">
          <label>First Name</label>
          <p>{props.company.first_name}</p>
          <label>Last Name</label>
          <p>{props.company.last_name}</p>
          <label>Email</label>
          <p>{props.company.email}</p>
          <label>Company name</label>
          <p>{props.company.company_name}</p>
          <label>Email for Incoming Applications</label>
          <p>{props.company.application_method}</p>
        </div>
        <div className="summary-btns">
          <label>Company Summary</label>
          <p>{props.company.summary}</p>
          <div className="company-btns">
            <button onClick={props.openEditor} className="edit-btn edit">
              Edit Account
            </button>
            <button onClick={props.openEditor} className="edit-btn bill">
              Billing
            </button>
            <button onClick={props.openEditor} className="edit-btn pass">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
