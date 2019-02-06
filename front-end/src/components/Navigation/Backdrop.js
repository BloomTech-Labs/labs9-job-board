import React from "react";

const Backdrop = props => {
  // If backdrop clicked, will close the side menu
  return <div className="backdrop" onClick={props.click} />;
};

export default Backdrop;
