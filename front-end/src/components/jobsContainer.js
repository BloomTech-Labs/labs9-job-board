import React, { Component } from 'react';
import axios from 'axios';
import { Route } from 'react-router-dom';
import JobList from './jobList';
import SingleJob from './singleJob';
import Billing from './billing/billing';

const url = "http://localhost:7777";


class JobsContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            jobs: [],
            searchResults: [],
            search: '',
        };
    };

    componentDidMount() {
        axios
            .get(`${url}/test/jobs`)
            .then(res => {
                console.log(res);
                this.setState({ jobs: res.data })
            })
            .catch(err => {
                console.log(err)
            })
    };

    handleInput = event => {
        this.setState({ search: event.target.value })
    };

    searchResults = event => {
        this.handleInput(event);
        this.setState(preState => {
            const search = preState.jobs.filter(result => {
                if (result) {
                    return result.job.toLowerCase().includes(preState.searchResults);
                }
            });
            return { search: search }
        })
    };

    render() {
        return (
            <div>
                <Route exact path='/' render={(Ownprops) => {
                    return (<JobList {...Ownprops} jobs={this.state.jobs} />)
                }}
                />
                <Route path='/jobs/:id' render={(Ownprops) => {
                    return (<SingleJob {...Ownprops} />)
                }}
                />
                <Route path='/billing' render={(Ownprops) => {
                    return (<Billing {...Ownprops} />)
                }}
                />
            </div>
        )
    }
}

export default JobsContainer;