import React from "react";
import { withRouter } from "react-router-dom";
import { withFirebase } from "../Firebase";

import * as ROUTES from "../../constants/routes";

class SignOut extends React.Component {
  constructor(props) {
    super(props);
  }

  // Backlog: modal for sign out error
  clickHandler = async event => {
    try {
      await this.props.firebase.doSignOut();
      this.props.history.push(ROUTES.LANDING);
    } catch (error) {
      alert("Error signing out. Please try again.");
    }
  };

  render() {
    return (
      <button
        type="button"
        onClick={this.clickHandler}
        className={this.props.className}
      >
        Sign Out
      </button>
    );
  }
}

export default withRouter(withFirebase(SignOut));
