import React from "react";
import { Link } from "react-router-dom";

import picture from "../../images/shaking-hands.jpeg";

const Header = props => {
  return (
    <div className="header">
      <div className="left-side">
        <h2>
          No degree? <br /> No problem.
        </h2>
        <h4>
          Matching brilliant minds with the world's most prominent companies.
        </h4>
        <p>
          Looking to hire?{" "}
          <span>
            <Link to="/sign-up">Create an employer profile</Link>
          </span>
          .
        </p>
      </div>
      <div className="right-side">
        <img src={picture} alt="shaking hands" />
      </div>
    </div>
  );
};

export default Header;
