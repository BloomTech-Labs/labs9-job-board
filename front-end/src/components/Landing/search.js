import React from "react";
import "./landingStyling.css";

const Search = props => {
  return (
    <form className="search-bar">
      <input
        placeholder="search jobs"
        type="text"
        name="search"
        onChange={props.searchResults}
        value={props.search}
      />
    </form>
  );
};

export default Search;
