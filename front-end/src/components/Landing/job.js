import React from "react";

const Jobs = props => {
  return (
    <div>
      <h3>{props.job.title}</h3>
      <h3>{props.job.company}</h3>
      <h3>{props.job.salary}</h3>
    </div>
  );
};

export default Jobs;
