import React from "react";

import picture from "../../images/shaking-hands.jpeg";

const Header = props => {
  return (
    <div className="header">
      <div className="left-side">
        <h2>No degree? No problem.</h2>
        <h4>Bridging together brilliant minds with prominent companies.</h4>
      </div>
      <div className="right-side">
        <img src={picture} alt="shaking-hands" />
      </div>
    </div>
  );
};

export default Header;
