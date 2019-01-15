import React, { Component } from "react";
import Dropzone from "react-dropzone";
import request from "superagent";
import axios from "axios";

const CLOUD_PRESET = process.env.REACT_APP_CLOUD_PRESET;
const CLOUD_UPLOAD = process.env.REACT_APP_CLOUDINARY_URL;

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

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUD_UPLOAD).field("file", file);

    upload.end((err, res) => {
      if (err) {
        console.log(err);
      } else if (res.body.secure_url !== "") {
        this.setState({
          picUrl: res.body.secure_url
        });
      }
    });
  }

  render() {
    return (
      <form>
        <div>
          <Dropzone
            multipe={false}
            onDrop={this.onDrop.bind(this)}
            accept="image/jpg, image/png"
          >
            {({ getRootProps, getInputProps }) => {
              return (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {<p>Upload a profile picture</p>}
                </div>
              );
            }}
          </Dropzone>
        </div>
        <div>
          {this.state.picUrl === "" ? null : (
            <div>
              <p>{this.state.uploadedPic.name}</p>
              <img src={this.state.picUrl} />
            </div>
          )}
        </div>
      </form>
    );
  }
}

export default ProfilePic;
