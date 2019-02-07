import React, { Component } from "react";
import axios from "axios";

import JobList from "./jobList";

import Search from "./search";

import Categories from "./categories";
import Header from "./header";

import LoadingBar from "../../images/design/png/loading-bar.svg";

import NewProfileForm from "../CompanyProfile/newProfileForm.js";
import bigLogo from "../../images/design/png/logos/logo with white text.png";

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
    // window.addEventListener("resize", this.conditionalScroll);
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

  // componentWillUnmount() {
  //   window.removeEventListener("resize", this.conditionalScroll);
  // }

  closeNewProfileModal = async () => {
    await this.setState({ newProfileModalVisible: false });
  };

  closeModal = async () => {
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

  conditionalScroll = event => {
    let windowSize = window.innerWidth;

    if (windowSize <= 500) {
      this.onEnterMobile();
    } else {
      this.onEnter();
    }
  };

  onEnterMobile = event => {
    window.scroll({
      top: 120,
      left: 100,
      behavior: "smooth"
    });
  };

  onEnter = event => {
    window.scroll({
      top: 380,
      left: 90,
      behavior: "smooth"
    });
  };

  searchResults = event => {
    this.handleInput(event);
    this.setState(preState => {
      const searchJobs = preState.jobs.filter(result => {
        return (
          result.title.toLowerCase().includes(preState.search.toLowerCase()) ||
          result.salary.includes(preState.search) ||
          result.company_name
            .toLowerCase()
            .includes(preState.search.toLowerCase())
        );
      });
      // console.log(searchJobs);
      return { searchJobs: searchJobs };
    });
  };

  render() {
    // console.log("click", this.handleInput);
    // console.log("Search", this.state);
    return (
      <div className="jobs-container container">
        <Header authUser={this.props.authUser} />
        <img className="header-logo" alt="logo" src={bigLogo} />
        <div className="white-box" />

        <div className="search-categories-container">
          <Categories searchByCategory={this.searchByCategory} />
          <Search
            searchResults={this.searchResults}
            search={this.state.search}
            conditionalScroll={this.conditionalScroll}
          />
        </div>
        {this.state.fetching ? (
          <img className="loading-bar" src={LoadingBar} alt="loading" />
        ) : this.state.jobs.length ? (
          <JobList
            jobs={this.state.search ? this.state.searchJobs : this.state.jobs}
          />
        ) : this.state.error ? (
          <div>Error retrieving jobs</div>
        ) : (
          <div className="no-results">No results found</div>
        )}
        {this.state.newProfileModalVisible ? (
          <NewProfileForm
            authUser={this.props.authUser}
            closeNewProfileModal={this.closeNewProfileModal}
            closeModal={this.closeModal}
          />
        ) : null}
      </div>
    );
  }
}

export default JobsContainer;
