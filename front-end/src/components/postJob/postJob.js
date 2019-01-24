import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import JobForm from "./jobForm";
import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;

class PostJob extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      salary: "",
      top_skills: "",
      add_skills: "",
      familiar: "",
      description: "",
      requirements: "",
      active: false,
      college_degree: false
    };
  }

  addJob = event => {
    event.preventDefault();

    console.log(this.props.authUser);

    const postObject = {};

    Object.keys(this.state).forEach(key => {
      if (this.state[key] || key === "active" || key === "college_degree") {
        postObject[key] = this.state[key];
      }
    });

    if (
      postObject.title &&
      postObject.salary &&
      postObject.description &&
      this.props.authUser
    ) {
      postObject.user_uid = this.props.authUser.uid;
      axios
        .post(`${URL}/api/jobs`, postObject)
        .then(response => {
          if (response.status === 201) {
            this.props.history.push("");
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    console.log(postObject);
  };

  //   axios
  //     .post(`${url}/api/jobs`, newJob)
  //     .then(res => console.log("POSTING JOB", res))
  //     .catch(err => console.log("ERROR", err));
  // };

  // updateJob = event => {
  //   event.preventDefault();
  //   const id = this.props.match.params.id;

  //   const updatedJob = {
  //     title: this.state.title,
  //     salary: this.state.salary,
  //     topSkills: this.state.topSkills,
  //     additionalSkills: this.state.additionalSkills,
  //     familiarWith: this.state.familiarWith,
  //     description: this.state.description,
  //     requirements: this.state.requirements,
  //     active: this.state.active,
  //     requiresDegree: this.state.requiresDegree
  //   };

  //   axios.put(`${url}/api/jobs/${id}`, updatedJob).then(res => {
  //     console.log("UPDATING JOB", res);
  //     this.setState({ job: res.data }).catch(err => console.log("ERROR", err));
  //   });
  // };

  jobActiveToggle = () => {
    this.setState(prevState => {
      return { active: !prevState.active };
    });
  };

  requiresDegreeToggle = () => {
    this.setState(prevState => {
      return { college_degree: !prevState.requiresDegree };
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div className="container">
        <JobForm
          submitHandler={this.addJob}
          handleInput={this.handleInput}
          title={this.state.title}
          salary={this.state.salary}
          top_skills={this.state.top_skills}
          add_skills={this.state.add_skills}
          familiar={this.state.familiar}
          description={this.state.description}
          requirements={this.state.requirements}
          college_degree={this.state.college_degree}
          jobActiveToggle={this.jobActiveToggle}
          requiresDegreeToggle={this.requiresDegreeToggle}
        />
      </div>
    );
  }
}

export default withRouter(PostJob);
