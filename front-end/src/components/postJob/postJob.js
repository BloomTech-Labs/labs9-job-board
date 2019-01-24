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
      category: "none",
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

  jobActiveToggle = () => {
    this.setState(prevState => {
      return { active: !prevState.active };
    });
  };

  categoryHandler = selected => {
    this.setState({ category: selected.value });
  };

  requiresDegreeToggle = () => {
    this.setState(prevState => {
      return { college_degree: !prevState.college_degree };
    });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleCancel = event => {
    this.props.history.push("");
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
