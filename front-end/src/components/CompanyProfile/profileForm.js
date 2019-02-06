import React from "react";
import ProfilePic from "./profilePic";
import { Link } from "react-router-dom";

import Balance from "../billing/Balance.js";

const ProfileForm = props => {
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
        <ProfilePic setUrl={props.setUrl} />
        <h1>Edit Your Account</h1>
        <Balance authUser={props.authUser} />
        <div className="border" />
        {/* <p>Job balance: {props.company.balance}</p> */}
        <button onClick={props.openEditor} className="edit-btn edit">
          Cancel
        </button>
      </div>
      <form onSubmit={props.updateUser} className="all-company-info">
        <div className="company-text">
          <label>First Name</label>
          <input
            id="firstName"
            placeholder="John"
            name="firstName"
            type="text"
            value={props.editFirstName}
            onChange={props.changeHandler}
          />
          <label>Last Name</label>
          <input
            id="lastName"
            placeholder="Doe"
            name="lastName"
            type="text"
            value={props.editLastName}
            onChange={props.changeHandler}
          />
          <label>Email</label>
          <input
            id="email"
            placeholder="johndoe@gmail.com"
            name="email"
            type="text"
            value={props.editEmail}
            onChange={props.changeHandler}
          />
          <label>Applications Inbox</label>
          <input
            id="applicationInbox"
            placeholder="applications@stessa.com"
            name="applicationInbox"
            type="text"
            value={props.editApplicationInbox}
            onChange={props.changeHandler}
          />
        </div>
        <div className="company-border" />
        <div className="company-text">
          <label>Company Name</label>
          <input
            id="companyName"
            placeholder="Stessa Solutions Inc."
            name="companyName"
            type="text"
            value={props.editCompanyName}
            onChange={props.changeHandler}
          />
          <label>Company Summary</label>
          <textarea
            id="companySummary"
            placeholder="Solving one problem at a time."
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
