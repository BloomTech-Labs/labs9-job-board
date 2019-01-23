import React, { Component } from "react";
import JobForm from "./jobForm";
import axios from "axios";

const url = process.env.REACT_APP_DB_URL;

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
      active: false,
      requiresDegree: false
    };
  }

  componentDidMount() {
    console.log(this.props.authUser);
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
      .post(`${url}/api/jobs`, newJob)
      .then(res => console.log("POSTING JOB", res))
      .catch(err => console.log("ERROR", err));
  };

  updateJob = event => {
    event.preventDefault();
    const id = this.props.match.params.id;

    const updatedJob = {
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

    axios.put(`${url}/api/jobs/${id}`, updatedJob).then(res => {
      console.log("UPDATING JOB", res);
      this.setState({ job: res.data }).catch(err => console.log("ERROR", err));
    });
  };

  jobActiveToggle = () => {
    this.setState(prevState => {
      return { active: !prevState.active };
    });
  };

  requiresDegreeToggle = () => {
    this.setState(prevState => {
      return { requiresDegree: !prevState.requiresDegree };
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div class="container">
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
          jobActiveToggle={this.jobActiveToggle}
          requiresDegreeToggle={this.requiresDegreeToggle}
        />
      </div>
    );
  }
}

export default PostJob;
