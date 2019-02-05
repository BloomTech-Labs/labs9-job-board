import React, { Component } from "react";

const cloudName = process.env.REACT_APP_CLOUDINARY_URL;
const preset = process.env.REACT_APP_CLOUDINARY_PRESET;

class ProfilePic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilePic: [],
      url: ""
    };
  }

  //uploads company profile pic to cloundinary and styles form
  uploadPhoto() {
    let _this = this;
    window.cloudinary.openUploadWidget(
      {
        cloud_name: `${cloudName}`,
        upload_preset: `${preset}`,
        multiple: false,
        styles: {
          palette: {
            window: "#444444",
            windowBorder: "#646464",
            tabIcon: "#ED8361",
            menuIcons: "#5A616A",
            textDark: "#F5F5F5",
            textLight: "#646464",
            link: "#90B0BA",
            action: "#FF620C",
            inactiveTabIcon: "#E89980"
          }
        }
      },
      function(error, result) {
        if (result.event === "success") {
          _this.setState({
            profilePic: _this.state.profilePic.concat(result.info)
          });
          _this.props.setUrl(_this.state.profilePic);
        } else {
          console.log(error);
        }
      }
    );
  }

  render() {
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
