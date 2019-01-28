import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import JobForm from "./jobForm";
import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;

class EditJob extends Component {
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

  componentDidMount() {
    axios
      .get(`${URL}/api/jobs/${this.id}`)
      .then(response => {
        console.log(response.data);
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

  updateJob = event => {
    event.preventDefault();

    const putObject = {};

    Object.keys(this.state).forEach(key => {
      if (this.state[key]) {
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

    console.log(putObject);
  };

  jobActiveToggle = () => {
    this.setState(prevState => {
      return { active: !prevState.active };
    });
  };

  requiresDegreeToggle = () => {
    this.setState(prevState => {
      return { college_degree: !prevState.college_degree };
    });
  };

  categoryHandler = selected => {
    this.setState({ category: selected.value });
  };

  handleInput = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
