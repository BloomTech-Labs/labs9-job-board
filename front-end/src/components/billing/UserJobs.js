import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LoadingBar from "../../images/design/png/loading-bar.svg";

// Url Variable
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
  // fetches and sets in state all jobs postings a user has created
  fetchJobs() {
    this.setState({ fetching: true, attempted: true }, () => {
      axios
        .get(`${URL}/api/jobs/user/${this.props.authUser.uid}`)
        .then(response => {
          if (response.data.length) {
            // sets response in state if user has posted at least one job
            this.setState({ jobs: response.data, fetching: false });
          } else {
            // sets message if user has not posted any jobs
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

  // on mount, if access to authenticated user in props then fetch user's jobs
  componentDidMount() {
    if (this.props.authUser) {
      this.fetchJobs();
    }
  }

  // on update, if access to authenticated user and fetch not attempted then fetch user's jobs
  componentDidUpdate() {
    if (this.props.authUser && !this.state.attempted) {
      this.fetchJobs();
    }
  }

  // returns user's job postings (list of jobs or 'No jobs posted')
  render() {
    return (
      <div className="billing-jobs">
        <h3>Your Job Postings:</h3>
        <div className="job-links">
          {this.state.fetching ? (
            <img src={LoadingBar} alt="loading bar" />
          ) : this.state.jobs.length ? (
            this.state.jobs.map(job => {
              return (
                <div className="each-job" key={job.id}>
                  {/* links to individual job's page */}
                  <Link className="job-name" to={`/jobs/${job.id}`}>
                    {job.title}
                  </Link>
                  {/* links to edit view for individual job */}
                  <Link className="edit-icon" to={`/edit-job/${job.id}`}>
                    <i className="fas fa-edit" />
                  </Link>
                </div>
              );
            })
          ) : (
            <div>{this.state.message}</div>
          )}
        </div>
      </div>
    );
  }
}

export default UserJobs;
