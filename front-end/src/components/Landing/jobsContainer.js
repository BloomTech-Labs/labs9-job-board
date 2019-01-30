import React, { Component } from "react";
import axios from "axios";

import JobList from "./jobList";

//import Jobs from "./job";

import Search from "./search";

import Categories from "./categories";
import Header from "./header";
import NewProfileForm from "../CompanyProfile/newProfileForm.js";
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
      error: false,
      newProfileModalVisible: false,
      attempted: false
    };
  }

  componentDidMount() {
    this.setState(
      { fetching: true },
      () => {
        axios
          .get(`${url}/api/jobs`)
          .then(res => {
            this.setState({ jobs: res.data, fetching: false });
          })
          .catch(err => {
            this.setState({ error: true, fetching: false });
          });
      },
      async () => {
        try {
          if (this.props.authUser) {
            const response = await axios.post(
              `${url}/api/auth/hasAccountInfo`,
              { user_uid: this.props.authUser.uid }
            );
            if (response.data.status === "no account information") {
              await this.setState({
                newProfileModalVisible: true,
                attempted: true
              });
            } else {
              await this.setState({ attempted: true });
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
    );
  }

  componentDidUpdate() {
    if (this.props.authUser && !this.state.attempted) {
      axios
        .post(`${url}/api/auth/hasAccountInfo`, {
          user_uid: this.props.authUser.uid
        })
        .then(response => {
          if (response.data.status === "no account information") {
            this.setState({
              newProfileModalVisible: true,
              attempted: true
            });
          } else {
            this.setState({ attempted: true });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  closeNewProfileModal = async () => {
    await this.setState({ newProfileModalVisible: false });
  };

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
        {this.state.newProfileModalVisible ? (
          <NewProfileForm
            authUser={this.props.authUser}
            closeNewProfileModal={this.closeNewProfileModal}
          />
        ) : null}
      </div>
    );
  }
}

export default JobsContainer;
