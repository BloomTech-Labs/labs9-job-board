import React from "react";

const Jobs = props => {
  return (
    // added some temporary fake data to fix styling

    <div className="each-job">
      {/* <h3>{props.job.title}</h3>
      <h3>{props.job.company_name}</h3>
      <h3>{props.job.salary}</h3> */}
      <div className="left-side">
        <h3>Junior Front End Developer</h3>
        <h3 className="spacing"> - </h3>
        <h3>Sensor Concepts Inc.</h3>
        <h3 className="spacing"> - </h3>
        <h3>$70,000</h3>
      </div>
      <div className="right-side">
        <h3>1/10</h3>
      </div>
    </div>
  );
};

export default Jobs;
