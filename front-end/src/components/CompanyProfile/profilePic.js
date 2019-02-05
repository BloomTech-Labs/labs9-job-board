import React, { Component } from "react";

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: [],
      url: ""
    };
  }

  // setUrl() {
  //   this.setState({ url: this.state.profilePic[0].url });
  // }

  uploadPhoto() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      { cloud_name: "dg9vhfqmb", upload_preset: "dzsxr7v2" },
      function(error, result) {
        // console.log(result);
        if (result) {
          _this.setState({ profilePic: _this.state.profilePic.concat(result) });
          _this.props.setUrl(_this.state.profilePic);
        } else {
          // console.log(error);
        }
      }
    );
  }

  render() {
    // console.log("pic", this.state);
    return (
      <div>
        {this.state.profilePic.length > 0 ? (
          <img
            className="profile-pic"
            src={this.state.profilePic[0].url}
            alt="profile"
          />
        ) : (
          <button
            className="profile-pic-button"
            onClick={this.uploadPhoto.bind(this)}
          >
            <span>Add Image</span>
            <span className="optional">(optional)</span>
            <span>+</span>
          </button>
        )}
      </div>
    );
  }
}

export default ProfilePic;
