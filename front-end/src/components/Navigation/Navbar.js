import React, { Component } from "react";
import { Link } from "react-router-dom";
import SideMenuToggleButton from "./SideMenuToggleButton";

import logo from "../../images/design/png/logos/logo with owl to left.png";



class Navbar extends Component {
  constructor(props) {
    super(props);

    // this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  };

  handleScroll(event) {
    var myNav = document.getElementById('mynav');
    //var x=myNav.scrollTop;
    //console.log(document.scrollingElement.scrollTop);
      if (document.scrollingElement.scrollTop > 500) {//Toggle colors
        myNav.classList.add("solid");
        myNav.classList.remove("navbar-container");
        // myNav.style.padding = "65px 10px";//change the size of nav
      }
      else {//Toggle colors
        myNav.classList.add("navbar-container");
        myNav.classList.remove("solid");
        // myNav.style.padding = "90px 10px";//change the size of nav
      }
    };

  render() {
    return (
      <header id = 'mynav'className="navbar-container">
        <nav className="navbar-navigation">
          <div>
            <SideMenuToggleButton click={this.props.sideMenuToggleClickHandler} />
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
};

export default Navbar;
