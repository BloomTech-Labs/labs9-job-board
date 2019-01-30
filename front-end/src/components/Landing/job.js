import React from "react";
//import { Link } from "react-router-dom";

const Jobs = props => {
  return (
    <div className="job-links" to="/">
      <div className="each-job">
        <div className="left-side">
          <h3 className = 'job'>{props.job.title}</h3>
          
          <h3 className = 'company'>{props.job.company_name}</h3>
          
          <h3 className = 'salary'>{props.job.salary}</h3>
        </div>
        <div className="date">
          <h3>{formatDate(props.job.created_at)}</h3>
        </div>
      </div>
    </div>
  );
};

function formatDate(date) {
  const newDate = new Date(date);
  let month = newDate.getMonth() + 1;
  let day = newDate.getDate();
  let year = newDate.getFullYear();

  return `${month}/${day}/${year}`;
}

export default Jobs;
