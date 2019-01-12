import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const url = process.env.REACT_APP_DB_URL;

class SingleJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.fetchJob(id);
  }

  fetchJob = id => {
    axios
      .get(`${url}/api/job/${id}`)
      .then(res => {
        console.log(res);
        this.setState(() => ({
          job: res.data
        }));
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    console.log("this.props", this.props);
    if (!this.state.job) {
      return <div>Loading Job...</div>;
    }
    return (
      <div>
        <Link to="/">Back to Jobs</Link>
        <div>
          <button>apply</button>
          <p>tell a friend</p>
          <p>Report</p>
        </div>
        <img src={this.state.job.user.avatar_image} />
        <h3>{this.state.job.user.company_name}</h3>
        <h3>{this.state.job.user.summary}</h3>
        <h3>{this.state.job.title}</h3>
        <h3>{this.state.job.salary}</h3>
        <h3>{this.state.job.addSkills}</h3>
        <h3>{this.state.job.topSkills}</h3>
        <h3>{this.state.job.familiar}</h3>
        <h3>{this.state.job.description}</h3>
        <h3>{this.state.job.requirements}</h3>
        {this.state.job.collegeDegree === 0 ? (
          <h4>No College required</h4>
        ) : (
          <h4>College degree required</h4>
        )}
      </div>
    );
  }
}

export default SingleJob;
