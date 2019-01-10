import React, { Component } from "react";
import axios from "axios";
import { Route } from "react-router-dom";
import JobList from "./jobList";
import SingleJob from "./singleJob";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import ResetPassword from "./ResetPassword/ResetPassword";

const url = process.env.REACT_APP_DB_UR;

class JobsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/test/jobs`)
      .then(res => {
        console.log(res);
        this.setState({ jobs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={Ownprops => {
            return <JobList {...Ownprops} jobs={this.state.jobs} />;
          }}
        />
        <Route
          path="/jobs/:id"
          render={Ownprops => {
            return <SingleJob {...Ownprops} />;
          }}
        />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/reset-password" component={ResetPassword} />
      </div>
    );
  }
}

export default JobsContainer;
