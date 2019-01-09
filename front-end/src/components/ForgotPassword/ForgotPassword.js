import React from "react";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return <div>Redirected to Forgot Password, yay!</div>;
  }
}

export default ForgotPassword;
