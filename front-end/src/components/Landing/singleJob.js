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
      .get(`${url}/api/jobs/${id}`)
      .then(async res => {
        await this.setState(() => ({
          job: res.data[0]
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
      <div className="single-job-container">
        <div className="apply-share">
          <button className="apply-btn">Apply</button>
          <a href="javascript: window.location='mailto:?subject=Check this Job!&body= '+ window.location;">
            Tell a Friend
          </a>
          <a href="javascript: window.location='mailto:support@knowledgewithoutcollege.com?subject=Please review this Job listing&body= '+ window.location;">
            Report
          </a>
        </div>
        <div className="job-listing">
          <div className="job-company-summary">
            <h2>{this.state.job.company_name}</h2>
            <h3>{this.state.job.summary}</h3>
          </div>

          <div className="job-title-salary">
            <h3>{this.state.job.title}</h3>
            <h3>${this.state.job.salary}</h3>
          </div>
          <div className="job-skills-desc-req">
            <h3>{this.state.job.addSkills}</h3>
            <h3>{this.state.job.topSkills}</h3>
            <h3>{this.state.job.familiar}</h3>
          </div>
          <div className="job-skills-desc-req">
            <h3>{this.state.job.description}</h3>
          </div>
          <div className="job-skills-desc-req">
            <h3>{this.state.job.requirements}</h3>
          </div>
          <div className="job-skills-desc-req college">
            {this.state.job.collegeDegree === 0 ? (
              <h4>No College required</h4>
            ) : (
              <h4>College degree required</h4>
            )}
          </div>
        </div>
        <div className="company-logo">
          <img src={this.state.job.avatar_image} />
        </div>
      </div>
    );
  }
}

export default SingleJob;
