import React from "react";

const ProfileInfo = props => {
  return (
    <div>
      <img src={props.company.avatar_image} />
      <h2>{props.company.company_name}</h2>
      <p>{props.company.email}</p>}
    </div>
  );
};

export default ProfileInfo;
