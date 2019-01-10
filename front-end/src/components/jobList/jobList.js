import React from 'react';
import { Link } from 'react-router-dom';
import Jobs from './job.js';
import Header from '../header/header.js';
import Search from '../search/search.js';

const JobList = props => {
    return (
        <div>
            <Link to='/sign-in'><button>Post a job</button></Link>
            <Header />
            <Search searchResults={props.searchResults} search={props.search}
            clickHandler={props.clickHandler}/>
            {props.jobs.map(job => (
                <Link to={`/jobs/${job.id}`} id={job.id} key={job.id}>
                    <Jobs job={job} id={job.id} />
                </Link>
            ))}
        </div>
    )
}

export default JobList;