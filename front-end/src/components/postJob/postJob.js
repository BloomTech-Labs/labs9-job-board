import React, { Component } from "react";
import JobForm from "./jobForm";
import axios from "axios";

const url = process.env.REACT_APP_DB_UR;

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      salary: "",
      topSkills: [],
      additionalSkills: [],
      familiarWith: [],
      description: "",
      requirements: "",
      active: true,
      requiresDegree: false
    };
  }

  addJob = event => {
    event.preventDefault();
    const newJob = {
      title: this.state.title,
      salary: this.state.salary,
      topSkills: this.state.topSkills,
      additionalSkills: this.state.additionalSkills,
      familiarWith: this.state.familiarWith,
      description: this.state.description,
      requirements: this.state.requirements,
      active: this.state.active,
      requiresDegree: this.state.requiresDegree
    };
    axios
      .post(`${url}/post_job`, newJob)
      .then(res => console.log(res))
      .catch(err => console.log(err));
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        <JobForm
          handleInput={this.handleInput}
          title={this.state.title}
          salary={this.state.salary}
          topSkills={this.state.topSkills}
          additionalSkills={this.state.additionalSkills}
          familiarWith={this.state.familiarWith}
          description={this.state.description}
          requirements={this.state.requirements}
          active={this.state.active}
          requiresDegree={this.state.requiresDegree}
        />
      </div>
    );
  }
}

export default PostJob;
