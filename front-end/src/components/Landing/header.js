import React from "react";
// import { Link } from "react-router-dom";
// import { Link as Slide, animateScroll as scroll } from "react-scroll";

import picture from "../../images/design/photos/Landing Page Photo.png";

const Header = props => {
  return (
    <div className="header">
      {/* <div className="left-side">
        <h2>
          No degree? <br /> No problem.
        </h2>
        <h4>
          Matching brilliant minds with the world's most prominent companies.
        </h4> */}
      {/* <p>
          Looking to hire?{" "}
          <span>
            <Link to="/sign-up">Create an employer profile</Link>
          </span>
          .
        </p> */}
      {/* <div className="post-search-btns">
          <Link
            to={props.authUser ? "/post-job" : "/sign-in"}
            className="post-search-job"
          >
            Post a Job
          </Link>
          <Slide
            spy={true}
            offset={-70}
            duration={933}
            to="all-jobs"
            smooth={true}
            className="post-search-job"
          >
            Search jobs
          </Slide>
        </div>
      </div> */}

      <div className="header-photo">
        <img src={picture} alt="shaking hands" />

        <div className="attention-catcher">
          <span className="attention-catcher-text">No Degree? </span> No
          Problem.
          <div className="attention-catcher-underline" />
          <p className="tagline">
            Matching brilliant minds with the world's most <br /> prominent
            companies
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
