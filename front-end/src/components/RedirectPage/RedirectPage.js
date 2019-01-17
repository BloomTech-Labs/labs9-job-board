import React from "react";
import Spinner from "../../images/loading-spinner.gif";

import { withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase/index";

import * as ROUTES from "../../constants/routes";

import "./RedirectPage.css";

const RedirectPage = props => {
  if (props.location.state) {
    if (props.location.state.redirectMethod === "google") {
      props.firebase.doSignInWithGoogle();
    }
  } else {
    props.history.push(ROUTES.LANDING);
  }
  return (
    <div className="redirect-page-container">
      <img src={Spinner} alt="Loading spinner" />
    </div>
  );
};

export default withRouter(withFirebase(RedirectPage));
