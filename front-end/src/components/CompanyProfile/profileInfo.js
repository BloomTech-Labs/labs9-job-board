import React from "react";

const ProfileInfo = props => {
  return (
    <div className="companyinfo">
      <div className="pic-jobbalance">
        <p>Job Postings: {props.company.balance}</p>
        <img src={props.company.avatar_image} className="avatar" />
      </div>
      <div className="all-company-info">
        <p className="company-text">{props.company.first_name}</p>
        <p className="company-text">{props.company.last_name}</p>
        <p className="company-text">{props.company.email}</p>
        <p className="company-text">{props.company.company_name}</p>
        <p className="company-text">{props.company.summary}</p>
        <p className="company-text">{props.company.application_method}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
