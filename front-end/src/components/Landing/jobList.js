import React from "react";
import { Link } from "react-router-dom";
import Jobs from "./job.js";

const JobList = props => {
  return (
    <div>
      {props.jobs.map(job => (
        <Link className="job-links" to={`/jobs/${job.id}`} key={job.id}>
          <Jobs job={job} id={job.id} />
        </Link>
      ))}
    </div>
  );
};

export default JobList;
