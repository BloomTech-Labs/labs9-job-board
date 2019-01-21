import React from "react";
import { Link } from "react-router-dom";
import Jobs from "./job";

const JobList = props => {
  return (
    <div>
      {props.jobs.map(job => {
        // console.log(job.title, job.id);
        return (
          <Link className="job-links" to={`/jobs/${job.id}`} key={job.id}>
            <Jobs job={job} key={job.id} />
          </Link>
        );
      })}
    </div>
  );
};

export default JobList;
