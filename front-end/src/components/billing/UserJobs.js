import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LoadingBar from "../../images/loading-bars.svg";

const URL = process.env.REACT_APP_DB_URL;

class UserJobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      fetching: false,
      message: "",
      attempted: false
    };
  }

  componentDidMount() {
    console.log("cdm props", this.props);
    if (this.props.authUser) {
      this.setState({ fetching: true, attempted: true }, () => {
        axios
          .get(`${URL}/api/jobs/user/${this.props.authUser.uid}`)
          .then(response => {
            console.log("component did mount", response);
            if (response.data.length) {
              this.setState({ jobs: response.data, fetching: false });
            } else {
              this.setState({ message: "No jobs posted", fetching: false });
            }
          })
          .catch(error => {
            this.setState({
              message: "Error retrieving jobs",
              fetching: false
            });
          });
      });
    }
  }

  componentDidUpdate() {
    if (this.props.authUser && !this.state.attempted) {
      axios
        .get(`${URL}/api/jobs/user/${this.props.authUser.uid}`)
        .then(response => {
          console.log(response);
          if (response.data.length) {
            this.setState({
              jobs: response.data,
              fetching: false,
              attempted: true
            });
          } else {
            this.setState({
              message: "No jobs posted",
              fetching: false,
              attempted: true
            });
          }
        })
        .catch(error => {
          this.setState({
            message: "Error retrieving jobs",
            fetching: false,
            attempted: true
          });
        });
    }
  }

  render() {
    return (
      <div className="billing-jobs">
        {this.state.fetching ? (
          <img src={LoadingBar} alt="loading bar" />
        ) : this.state.jobs.length ? (
          this.state.jobs.map(job => {
            return (
              <div className="job-links">
                <Link to={`/jobs/${job.id}`} key={job.id}>
                  <div className="billing-job">{job.title}</div>
                </Link>
                <Link to={`/edit-job/${job.id}`}>Edit</Link>
              </div>
            );
          })
        ) : (
          <div>{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default UserJobs;
