import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import JobList from "./jobList.js";
import Search from "./search";
import Header from "./header";

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
      <div className="jobs-container">
        <Header />
        <Link to="/sign-in">
          <button>Post a job</button>
        </Link>
        <Search
          searchResults={this.searchResults}
          search={this.state.search}
          jobs={
            this.state.searchJobs.length > 0
              ? this.state.searchJobs
              : this.state.jobs
          }
        />
        <JobList
          searchResults={this.searchResults}
          search={this.state.search}
          jobs={
            this.state.searchJobs.length > 0
              ? this.state.searchJobs
              : this.state.jobs
          }
        />
      </div>
    );
  }
}

export default JobsContainer;
