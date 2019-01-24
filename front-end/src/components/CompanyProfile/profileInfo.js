import React from "react";

const ProfileInfo = props => {
  return (
    <div>
      <p>{props.company.balance}</p>
      <img src={props.company.avatar_image} />
      <p>{props.company.first_name}</p>
      <p>{props.company.last_name}</p>
      <p>{props.company.email}</p>
      <h2>{props.company.company_name}</h2>
      <p>{props.company.summary}</p>
      <p>{props.company.application_method}</p>
    </div>
  );
};

export default ProfileInfo;
