import React from "react";
import { Link } from "react-router-dom";

// added some temporary fake data to fix styling (replace)

const Jobs = props => {
  return (
    <Link className="job-links" to={`/jobs/${props.id}`}>
      <div className="job-links" to="/">
        <div className="each-job">
          <div className="left-side">
            <h3 id="job-title">{props.job.title}</h3>
            <h3 className="spacing"> - </h3>
            <h3>{props.job.company_name}</h3>
            <h3 className="spacing"> - </h3>
            <h3>{props.job.salary}</h3>
          </div>
          <div className="right-side">
            <h3>{props.job.created_at}</h3>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Jobs;
