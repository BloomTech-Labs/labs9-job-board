import React, { Component } from 'react';
import axios from 'axois';
import { Route } from 'react-router-dom';
import JobList from './JobList';


class JobsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <JobList />
            </div>
        )
    }
}

export default JobsContainer;