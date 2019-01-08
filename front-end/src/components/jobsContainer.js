import React, { Component } from 'react';
import axios from 'axois';
import { Route } from 'react-router-dom';
import JobList from './jobList';


class JobsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <jobList />
            </div>
        )
    }
}

export default JobsContainer;