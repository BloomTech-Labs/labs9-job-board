import React from "react";
import searchIcon from "../../images/design/png/search-icon-white.png";
//import search from "../../images/search-image.png";

const Search = props => {
  return (
    <form className="search-bar" onClick={props.conditionalScroll}>
      <input
        placeholder="Search jobs..."
        type="text"
        name="search"
        onChange={props.searchResults}
        value={props.search}
        className="search-input"
        onSubmit={props.searchResults}
      />
      <img
        onClick={props.searchResults}
        src={searchIcon}
        className="search-icon"
        alt="search icon"
      />
    </form>
  );
};

export default Search;
