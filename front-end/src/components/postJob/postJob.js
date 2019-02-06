import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import JobForm from "./jobForm";
import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;

class PostJob extends Component {
  // Treated as the main app for the data to post a job
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
      category: "none",
      active: false,
      college_degree: false
    };
  }

  // Changes the data in the state to add a new job
  addJob = event => {
    event.preventDefault();
    const postObject = {};
    Object.keys(this.state).forEach(key => {
      if (this.state[key] || key === "active" || key === "college_degree") {
        postObject[key] = this.state[key];
      }
    });

    if (
      // postObject.title &&
      postObject.salary &&
      postObject.description &&
      this.props.authUser
    ) {
      postObject.user_uid = this.props.authUser.uid;
      axios
        .post(`${URL}/api/jobs`, postObject)
        .then(response => {
          // console.log("response", response);
          if (response.status === 201) {
            this.props.history.push(`/jobs/${response.data.id}`);
          }
        })
        .catch(error => {
          if (error.response.status === 400) {
            alert(error.response.data.message);
          }
        });
    }
  };

  // Changes the toggle for the job from being active/inactive
  jobActiveToggle = () => {
    this.setState(prevState => {
      return { active: !prevState.active };
    });
  };

  // Handles the category of the job
  categoryHandler = selected => {
    this.setState({ category: selected.value });
  };

  // Changes the toggle for the job from requiring/not requiring a degree
  requiresDegreeToggle = () => {
    this.setState(prevState => {
      return { college_degree: !prevState.college_degree };
    });
  };

  // Allows inputs to be filled in
  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Clears inputs
  handleCancel = event => {
    this.props.history.push("");
  };

  render() {
    return (
      <div>
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
          category={this.state.category}
          jobActiveToggle={this.jobActiveToggle}
          requiresDegreeToggle={this.requiresDegreeToggle}
          categoryHandler={this.categoryHandler}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default withRouter(PostJob);
