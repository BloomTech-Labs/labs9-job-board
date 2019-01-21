import React from "react";
import Spinner from "../../images/loading-spinner.gif";

import { withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase/index";

import * as ROUTES from "../../constants/routes";

import "./RedirectPage.css";
import axios from "axios";

const URL = process.env.REACT_APP_DB_URL;

const RedirectPage = props => {
  if (props.location.state) {
    if (props.location.state.redirectMethod === "google") {
      props.firebase.doSignInWithGoogle(); // <-------------------- handle errors
    }
  } else {
    props.firebase
      .redirectResult()
      .then(response => {
        // console.log(response);
        if (response.user && response.user.uid) {
          axios
            .post(`${URL}/api/hasAccountInfo`, { user_uid: response.user.uid })
            .then(res => {
              if (res) {
                props.history.push(ROUTES.LANDING);
              } else {
                props.history.push(ROUTES.NEW_PROFILE);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          props.history.push(ROUTES.LANDING);
        }
        // use response.user.uid to determine if they have filled out their account information
      })
      .catch(error => console.log(error));

    // props.history.push(ROUTES.LANDING);
  }
  // console.log(error);

  return (
    <div className="redirect-page-container">
      <img src={Spinner} alt="Loading spinner" />
    </div>
  );
};

export default withRouter(withFirebase(RedirectPage));
