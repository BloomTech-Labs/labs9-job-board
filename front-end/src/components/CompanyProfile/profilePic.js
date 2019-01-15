import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";

const cloudUrl = process.env.REACT_APP_CLOUD_PRESET;
const cloudUpload = process.env.REACT_APP_CLOUD_UPLOAD;

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadedPic: null,
      picUrl: ""
    };
  }

  onDrop(files) {
    this.setState({
      uploadedPic: files[0]
    });
  }
  render() {
    return (
      <form>
        <Dropzone
          multipe={false}
          accept="image/jpg, image/png"
          onDrop={this.onImageDrop.bind(this)}
        >
          <p>Upload a profile picture</p>
        </Dropzone>
      </form>
    );
  }
}

export default ProfilePic;
