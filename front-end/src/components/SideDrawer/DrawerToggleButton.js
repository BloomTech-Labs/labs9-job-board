import React from "react";

import "./SideDrawer.css";

const DrawerToggleButton = props => {
  return (
    <button className="toggle-button">
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
      <div className="toggle-button-line" />
    </button>
  );
};

export default DrawerToggleButton;
