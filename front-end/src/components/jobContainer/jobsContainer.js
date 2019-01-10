import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";

import JobList from "../jobList/jobList.js";
import SingleJob from "../SingleJob/singleJob";
import SignIn from "../SignIn/SignIn.js";
import SignUp from "../SignUp/SignUp.js";

import ResetPassword from "../ResetPassword/ResetPassword";

const url = process.env.REACT_APP_DB_URL;

class JobsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      searchJobs: [],
      search: ""
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/test/api/jobs`)
      .then(res => {
        console.log(res);
        this.setState({ jobs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchResults = event => {
    this.handleInput(event);
    this.setState(preState => {
      const searchJobs = preState.jobs.filter(result => {
        return (
          result.title.includes(preState.search) ||
          result.company.includes(preState.search) ||
          result.topSkills.includes(preState.search) ||
          result.familiar.includes(preState.search)
        );
      });
      return { searchJobs: searchJobs };
    });
  };

  render() {
    console.log("click", this.handleInput);
    console.log("Search", this.state.search);
    return (
      <div>
        <Route
          exact
          path="/"
          render={Ownprops => {
            return (
              <JobList
                {...Ownprops}
                searchResults={this.searchResults}
                search={this.state.search}
                jobs={
                  this.state.searchJobs.length > 0
                    ? this.state.searchJobs
                    : this.state.jobs
                }
              />
            );
          }}
        />
        <Route
          path="/jobs/:id"
          render={Ownprops => {
            return <SingleJob {...Ownprops} />;
          }}
        />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/reset-password" component={ResetPassword} />
      </div>
    );
  }
}

export default JobsContainer;
