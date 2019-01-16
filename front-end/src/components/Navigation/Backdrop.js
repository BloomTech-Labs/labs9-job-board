import React from "react";
import "./NavigationStyles.css";

const Backdrop = props => {
  return <div className="backdrop" onClick={props.click} />;
};

export default Backdrop;
