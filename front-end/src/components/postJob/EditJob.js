import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import JobForm from "./jobForm";
import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;

class EditJob extends Component {
  // Treated as the main app for the data to edit a job
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

  id = Number(this.props.match.params.id);

  // Pulls in data from the job into the input fields on edit job page
  componentDidMount() {
    axios
      .get(`${URL}/api/jobs/${this.id}`)
      .then(response => {
        // console.log(response.data);
        if (response.data.length) {
          this.setState({
            title: response.data[0].title,
            salary: response.data[0].salary,
            top_skills: response.data[0].top_skills,
            add_skills: response.data[0].add_skills,
            familiar: response.data[0].familiar,
            description: response.data[0].description,
            requirements: response.data[0].requirements,
            active: response.data[0].active,
            college_degree: response.data[0].college_degree,
            category: response.data[0].category
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  // Updates state with the new data entered
  updateJob = event => {
    event.preventDefault();
    const putObject = {};
    Object.keys(this.state).forEach(key => {
      if (this.state[key] || key === "active" || key === "college_degree") {
        putObject[key] = this.state[key];
      }
    });

    if (
      putObject.title &&
      putObject.salary &&
      putObject.description &&
      this.id
    ) {
      axios
        .put(`${URL}/api/jobs/${this.id}`, putObject)
        .then(response => {
          if (response.status === 200) {
            this.props.history.push(`/jobs/${this.id}`);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }

    // console.log(putObject);
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
    this.props.history.push("/billing");
  };

  render() {
    return (
      <div className="container">
        <JobForm
          pageTitle="Edit Job"
          submitHandler={this.updateJob}
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
          active={this.state.active}
          jobActiveToggle={this.jobActiveToggle}
          requiresDegreeToggle={this.requiresDegreeToggle}
          handleCancel={this.handleCancel}
          categoryHandler={this.categoryHandler}
        />
      </div>
    );
  }
}

export default withRouter(EditJob);
