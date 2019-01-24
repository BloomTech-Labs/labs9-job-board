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
      search: "",
      fetching: false,
      error: false
    };
  }

  componentDidMount() {
    this.setState({ fetching: true }, () => {
      axios
        .get(`${url}/api/jobs`)
        .then(res => {
          this.setState({ jobs: res.data, fetching: false });
        })
        .catch(err => {
          this.setState({ error: true, fetching: false });
        });
    });
  }

  searchByCategory = category => {
    if (category !== "all") {
      axios
        .get(`${url}/api/jobs/category/${category}`)
        .then(res => {
          this.setState({ jobs: res.data });
        })
        .catch(err => {
          this.setState({ error: true, fetching: false });
        });
    } else {
      this.setState({ fetching: true }, () => {
        axios
          .get(`${url}/api/jobs`)
          .then(res => {
            this.setState({ jobs: res.data, fetching: false });
          })
          .catch(err => {
            this.setState({ error: true, fetching: false });
          });
      });
    }
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  searchResults = event => {
    this.handleInput(event);
    this.setState(preState => {
      const searchJobs = preState.jobs.filter(result => {
        return result.title.toLowerCase().includes(preState.search);
      });
      console.log(searchJobs);
      return { searchJobs: searchJobs };
    });
  };

  render() {
    // console.log("click", this.handleInput);
    // console.log("Search", this.state.search);

    return (
      <div className="jobs-container container">
        <Header authUser={this.props.authUser} />
        <div className="search-categories-container">
          <Categories searchByCategory={this.searchByCategory} />
          <Search
            searchResults={this.searchResults}
            search={this.state.search}
          />
        </div>
        {this.state.fetching ? (
          <img src={LoadingBar} alt="loading" />
        ) : this.state.jobs.length ? (
          <JobList
            jobs={this.state.search ? this.state.searchJobs : this.state.jobs}
          />
        ) : this.state.error ? (
          <div>Error retrieving jobs</div>
        ) : (
          <div>No results found</div>
        )}
      </div>
    );
  }
}

export default JobsContainer;
