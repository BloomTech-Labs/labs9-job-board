import React from "react";
//import search from "../../images/search-image.png";

const Search = props => {
  return (
    <form className="search-bar" onClick = {props.onEnter}>
      <input
        placeholder="Search jobs..."
        type="text"
        name="search"
        onChange={props.searchResults}
        value={props.search}
        className="search-input"
        onSubmit = {props.searchResults}
      />
    </form>
  );
};

export default Search;
