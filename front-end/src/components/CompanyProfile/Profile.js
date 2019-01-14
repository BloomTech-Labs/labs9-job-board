import React, { Component } from "react";
import axios from "axios";

const url = process.env.REACT_APP_DB_URL;

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      users: null
    };
  }

  componentDidMount() {
    axios
      .get(`${url}/api/users`)
      .then(res => {
        this.setState({ users: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>coming soon</h1>
      </div>
    );
  }
}

export default Profile;
