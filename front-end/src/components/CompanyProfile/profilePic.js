import React, { Component } from "react";

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: []
    };
  }

  setUrl() {
    console.log(this.state.profilePic[0].url);
  }

  uploadPhoto() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dg9vhfqmb", upload_preset: "dzsxr7v2" },
      function(error, result) {
        console.log(result);
        if (result) {
          _this.setState({ profilePic: _this.state.profilePic.concat(result) });
          _this.setUrl();
        } else {
          console.log(error);
        }
      }
    );
  }

  render() {
    return <div />;
  }
}

export default ProfilePic;
