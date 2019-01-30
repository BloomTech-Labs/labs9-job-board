import React, { Component } from "react";
import axios from "axios";

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

  clickHandler() {
    window.location = `mailto:${this.state.job.application_method}`;
  }

  shareHandler() {
    window.location = "mailto:?subject=Check this Job!&body=" + window.location;
  }

  reportHandler() {
    window.location =
      "mailto:mailto:support@knowledgewithoutcollege.com?subject=Please review this Job listing&body=" +
      window.location;
  }
  render() {
    console.log("this.props", this.state.job);
    if (!this.state.job) {
      return <div>Loading Job...</div>;
    }
    return (
      <div className="single-job-container">
        <div className="apply-share">
          <button className="apply-btn" onClick={() => this.clickHandler()}>
            Apply
          </button>
          <i className="fa fa-envelope-o" onClick={this.shareHandler} />
          <p onClick={this.reportHandler}>Report</p>
        </div>
        <div className="job-listing">
          <div className="job-pic-summary">
            <img src={this.state.job.avatar_image} />
            <h2>{this.state.job.company_name}</h2>
            <p>{this.state.job.summary}</p>
          </div>
          <div className="joint-columns">
            <div className="job-column one">
              <p className="title">{this.state.job.title}</p>
              <p>{this.state.job.salary}</p>
              <label>Skills:</label>
              <p>
                {this.state.job.add_skills}, {this.state.job.top_skills},
                {this.state.job.familiar}
              </p>
              <label>Requirements:</label>
              <p>{this.state.job.requirements}</p>
            </div>
            <div className="job-column two">
              <label>Job Description:</label>
              <p>{this.state.job.description}</p>
              {this.state.job.college_degree === false ? (
                <p>No degree required</p>
              ) : (
                <p>College degree required</p>
              )}
              <button className="apply-btn" onClick={() => this.clickHandler()}>
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleJob;
