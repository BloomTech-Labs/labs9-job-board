import React from "react";
import "./Navigation.css";

const Backdrop = props => {
  return <div className="backdrop" onClick={props.click} />;
};

export default Backdrop;
