import React from 'react';
import { Link } from 'react-router-dom';
import Jobs from './job.js';

const JobList = props => {
    return (
        <div>
            <button>Post a job</button>
            {props.jobs.map(job => (
                <Link to={`/jobs/${job.id}`} id={job.id} key={job.id}>
                    <Jobs job={job} id={job.id}/>
                </Link>
            ))}
        </div>
    )
}

export default JobList;