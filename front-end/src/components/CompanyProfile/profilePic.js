import React, { Component } from "react";
import DropZone from "react-dropzone";
import request from "superagent";

class ProfilePic extends Component {
  render() {
    <form>
      <Dropzone
        multipe={false}
        accept="image/*"
        onDrop={this.onImageDrop.bind(this)}
      >
        <p>Upload a profile picture</p>
      </Dropzone>
    </form>;
  }
}
