import React from "react";
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
    if (this.props.authUser) {
      this.setState({ fetching: true, attempted: true }, () => {
        axios
          .get(`${URL}/api/jobs/user/${this.props.authUser}`)
          .then(response => {
            if (response.length) {
              this.setState({ jobs: response, fetching: false });
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
        .get(`${URL}/api/jobs/user/${this.props.authUser}`)
        .then(response => {
          if (response.length) {
            this.setState({ jobs: response, fetching: false });
          } else {
            this.setState({ message: "No jobs posted", fetching: false });
          }
        })
        .catch(error => {
          this.setState({ message: "Error retrieving jobs", fetching: false });
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
            return <div className="billing-job">{job.title}</div>;
          })
        ) : (
          <div>{this.state.message}</div>
        )}
      </div>
    );
  }
}

export default UserJobs;
