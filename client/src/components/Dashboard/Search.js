import React from "react";
import "./Dashboard.css";

function Search(props) {
  return (
    <div id="search-container">
      <input
        type="text"
        placeholder="Search boards"
        id="search-input"
        onChange={props.handleSearch}
      />
    </div>
  );
}

export default Search;
