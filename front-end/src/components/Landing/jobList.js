import React from "react";
import { Link } from "react-router-dom";
import Jobs from "./job";

const JobList = props => {
  // console.log("My props yo:", props);
  return (
    <div className="all-jobs">
      <div className ='job-list-headers'>
        <div className = 'job-title'> Job Title </div>
        <div className = 'company-title' > Company </div>
        <div className = 'salary-title'> Salary </div>
        <div className = 'date-posted-title'> Date Posted </div>
      </div>
      {props.jobs.map(job => (
        <Link className="job-links" to={`/jobs/${job.id}`} key={job.id}>
          <Jobs job={job} id={job.id} />
        </Link>
      ))}
    </div>
  );
};

export default JobList;
