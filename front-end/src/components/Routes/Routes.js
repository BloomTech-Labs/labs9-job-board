import React, { Component } from "react";
import { Route } from "react-router-dom";
import JobsContainer from "../Landing/jobsContainer";

import SingleJob from "../Landing/singleJob";
import PostJob from "../postJob/postJob";
import EditJob from "../postJob/EditJob";
//import Profile from "../CompanyProfile/profileForm.js";
import UpdateProfile from "../CompanyProfile/updateProfile.js";
import SignUp from "../SignUp/SignUp";
import SignIn from "../SignIn/SignIn";
import ResetPassword from "../ResetPassword/ResetPassword";
import Billing from "../billing/billing";
//import RedirectPage from "../RedirectPage/RedirectPage";
import NewProfileForm from "../CompanyProfile/newProfileForm";

import * as ROUTES from "../../constants/routes";
import "./Routes.css";

class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="routes">
        <Route
          exact
          path={ROUTES.LANDING}
          render={props => (
            <JobsContainer {...props} authUser={this.props.authUser} />
          )}
        />
        <Route path={ROUTES.JOB} render={props => <SingleJob {...props} />} />
        <Route
          path={ROUTES.POST_JOB}
          render={props => (
            <PostJob {...props} authUser={this.props.authUser} />
          )}
        />
        <Route
          path={ROUTES.EDIT_JOB}
          render={props => (
            <EditJob {...props} authUser={this.props.authUser} />
          )}
        />
        {/* <Route path={ROUTES.COMPANY_PROFILE} component={Profile} /> */}
        <Route
          path={ROUTES.BILLING}
          render={props => (
            <Billing {...props} authUser={this.props.authUser} />
          )}
        />
        <Route
          path={ROUTES.SIGN_UP}
          render={props => <SignUp {...props} authUser={this.props.authUser} />}
        />
        <Route path={ROUTES.SIGN_IN} render={() => <SignIn />} />
        <Route path={ROUTES.RESET_PASSWORD} component={ResetPassword} />
        {/* <Route
          path={ROUTES.REDIRECT}
          render={props => (
            <RedirectPage {...props} authUser={this.props.authUser} />
          )}
        /> */}
        <Route
          path={ROUTES.ACCOUNT}
          render={props => (
            <UpdateProfile {...props} authUser={this.props.authUser} />
          )}
        />
        <Route
          path={ROUTES.NEW_PROFILE}
          render={props => (
            <NewProfileForm {...props} authUser={this.props.authUser} />
          )}
        />
      </div>
    );
  }
}

export default Routes;
