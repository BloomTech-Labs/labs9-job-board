import React from "react";

const SideMenuToggleButton = props => {
  return (
    // Allows side menu to be toggled between opened and closed
    <button className="toggle-button" onClick={props.click}>
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
    </button>
  );
};

export default SideMenuToggleButton;
