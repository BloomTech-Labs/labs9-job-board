import React from "react";
import { Link } from "react-router-dom";
import Balance from "../billing/Balance";

const ProfileInfo = props => {
  return (
    <div className="companyInfo">
      <div className="menu-pass-bill">
        <Link to="/billing" className="link-bill">
          Billing
        </Link>
        {/* does not show change password button for Google auth ONLY accounts */}
        {props.authUser &&
        (props.authUser.providerData.length > 1 ||
          props.authUser.providerData[0].providerId === "password") ? (
          <div className="link-pass" onClick={props.toggleModal}>
            Change Password
          </div>
        ) : null}
      </div>
      <div className="pic-account">
        <img
          src={props.company.avatar_image}
          className="avatar"
          alt="company logo"
        />
        <h1>Your Account</h1>
        <Balance authUser={props.authUser} />
        <div className="border" />
        {/* <p>Job balance: {props.company.balance}</p> */}

        <button onClick={props.openEditor} className="edit-btn edit">
          Edit Account
        </button>
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
        <div className="company-border" />
        <div className="company-text">
          <label>Company Name</label>
          <p>{props.company.company_name}</p>
          <label>Company Summary</label>
          <p>{props.company.summary}</p>
          <label>Application Email</label>
          <p>{props.company.application_method}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
