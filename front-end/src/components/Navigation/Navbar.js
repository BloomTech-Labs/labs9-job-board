import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideMenuToggleButton from "./SideMenuToggleButton";

import logo from "../../images/design/png/logos/logo with owl to left.png";

class Navbar extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let url = window.location.pathname;
    let myNav = document.getElementById("mynav");

    if (url === "/") {
      window.addEventListener("scroll", this.handleScroll);
    } else {
      myNav.classList.add("solid");
      myNav.classList.remove("navbar-container");
    }
  }

  componentDidUpdate() {
    let url = window.location.pathname;
    let myNav = document.getElementById("mynav");

    if (url === "/") {
      myNav.classList.add("navbar-container");
      myNav.classList.remove("solid");
      window.addEventListener("scroll", this.handleScroll);
    } else {
      myNav.classList.add("solid");
      myNav.classList.remove("navbar-container");
    }
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    let myNav = document.getElementById("mynav");
    let url = window.location.pathname;

    if (document.scrollingElement.scrollTop < 100 && url === "/") {
      myNav.classList.add("navbar-container");
      myNav.classList.remove("solid");
    } else {
      //Toggle colors
      myNav.classList.add("solid");
      myNav.classList.remove("navbar-container");
    }
  }

  render() {
    return (
      <header id="mynav" className="solid">
        <nav className="navbar-navigation">
          <div>
            <SideMenuToggleButton
              click={this.props.sideMenuToggleClickHandler}
            />
          </div>
          <div className="navbar-logo">
            <Link to="/">
              <img src={logo} alt="knowledge without college" />
            </Link>
          </div>
          {/* <div className="navbar-navigation-items"> */}
          {/* <NavLink to="/">Home</NavLink>
            <NavLink to="/jobs/:id">Single Job</NavLink>
            <NavLink to="/post-job">Post Job</NavLink>
            <NavLink to="/billing">Billing</NavLink>
            <NavLink to="/account">Account</NavLink>
            <NavLink to="/sign-up">Sign Up</NavLink>
            <NavLink to="/sign-in">Sign In</NavLink>
            <NavLink to="/reset-password">Reset Password</NavLink> */}
          {/* </div> */}
        </nav>
      </header>
    );
  }
}

export default Navbar;
