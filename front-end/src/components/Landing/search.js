import React from "react";
import "./landingStyling.css";
import search from "../../images/search-image.png";

const Search = props => {
  return (
    <form className="search-bar">
      <input
        placeholder="Search jobs..."
        type="text"
        name="search"
        onChange={props.searchResults}
        value={props.search}
        className="search-input"
      />
    </form>
  );
};

export default Search;
