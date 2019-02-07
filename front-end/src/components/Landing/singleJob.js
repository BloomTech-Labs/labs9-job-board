import React, { Component } from "react";
import axios from "axios";
import LoadingBar from "../../images/design/png/loading-bar.svg";

const url = process.env.REACT_APP_DB_URL;
const email = process.env.REACT_APP_DB_EMAIL;

class SingleJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      job: null
    };
  }

  //setting a single job on state: get request
  componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.params.id;
    this.fetchJob(id);
  }

  //takes id from job that user clicks
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

  //creates an email setting fields of to, subject, body
  clickHandler() {
    window.location =
      `mailto:${this.state.job.application_method}?subject=${
        this.state.job.title
      }&body=` + window.location;
  }

  //creates an email with link to specific job
  shareHandler() {
    window.location = "mailto:?subject=Check this Job!&body=" + window.location;
  }

  // creates email to company to report job
  reportHandler() {
    window.location =
      `mailto:${email}?subject=Please review this Job listing&body=` +
      window.location;
  }

  render() {
    return (
      <div className="single-job-container">
        {!this.state.job ? (
          <div className="loading-container">
            <img src={LoadingBar} alt="loading bar" className="loading" />
          </div>
        ) : (
          <div className="job-listing">
            <div className="job-pic-summary">
              <img src={this.state.job.avatar_image} alt="company avatar" />
              <h1>{this.state.job.company_name}</h1>
              <div className="border" />
              <h2>{this.state.job.summary}</h2>
              <button className="apply-btn" onClick={() => this.clickHandler()}>
                Apply
              </button>
            </div>
            <div className="joint-columns">
              <div className="job-column one">
                <div className="title-salary">
                  <p className="title">{this.state.job.title}</p>
                  <p>{this.state.job.salary}</p>
                </div>
                <label>Skills</label>
                <p>
                  {this.state.job.add_skills}, {this.state.job.top_skills},
                  {this.state.job.familiar}
                </p>
                <label>Requirements</label>
                <p>{this.state.job.requirements}</p>
              </div>
              <div className="job-border" />
              <div className="job-column two">
                <label>Job Description</label>
                <p>{this.state.job.description}</p>
                <div className="apply-college">
                  <div className="degree">
                    <label>Degree Required</label>
                    {this.state.job.college_degree === false ? (
                      <p>No</p>
                    ) : (
                      <p>Yes</p>
                    )}
                  </div>
                  <button
                    className="apply-btn"
                    onClick={() => this.clickHandler()}
                  >
                    Apply
                  </button>
                </div>
                <div className="share">
                  <h3 onClick={this.shareHandler}> Share</h3>
                  <h3 onClick={this.reportHandler}>Report</h3>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SingleJob;
