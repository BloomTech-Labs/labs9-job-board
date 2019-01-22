import React, { Component } from "react";
import axios from "axios";

import JobList from "./jobList";


//import Jobs from "./job";

import Search from "./search";

import Categories from "./categories";
import Header from "./header";
import LoadingBar from "../../images/loading-bars.svg";


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
      .get(`${url}/api/jobs`)
      .then(res => {
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
        return result.title.toLowerCase().includes(preState.search);
      });
      return { searchJobs: searchJobs };
    });
  };

  render() {
    // console.log("click", this.handleInput);
    // console.log("Search", this.state.search);

    return (
      <div className="jobs-container container">
        <Header />
        <div className="search-categories-container">
          <Categories />
          <Search
            searchResults={this.searchResults}
            search={this.state.search}
          />
        </div>
        {this.state.jobs.length ? (
          <JobList
            jobs={
              this.state.searchJobs.length > 0
                ? this.state.searchJobs
                : this.state.jobs
            }
          />
        ) : (
          <img src={LoadingBar} alt="loading" />
        )}
      </div>
    );
  }
}

export default JobsContainer;
