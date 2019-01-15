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

    this.handeUpload(files[0]);
  }

  handeUpload(file) {
    const upload = request
      .post(cloudUpload)
      .field(`upload_reset`, cloudUrl)
      .field("file", file);

    upload
      .then((err, res) => {
        if (err) {
          console.log(err);
        }

        if (res.body.secure_url !== "") {
          this.setState({
            picUrl: res.body.secure_url
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <form>
        <div>
          <Dropzone
            multipe={false}
            onDrop={this.onDrop}
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
