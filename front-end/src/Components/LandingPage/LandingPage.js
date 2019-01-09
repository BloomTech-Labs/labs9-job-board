import React, { Component } from 'react';
import axios from 'axois';
import { Route } from 'react-router-dom';
import JobList from './JobList';


class LandingPage extends Component {
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

export default LandingPage;