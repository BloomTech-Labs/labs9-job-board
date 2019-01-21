import React from "react";
import { Link } from "react-router-dom";
import Jobs from "./job";

const JobList = props => {
  return (
    <div>
      {props.jobs.map(job => {
        // console.log(job.title, job.id);
        return <Jobs job={job} id={job.id} key={job.id} />;
      })}
    </div>
  );
};

export default JobList;
