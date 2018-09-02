import React from "react";

const Search = () => {
  return (
    <div className="search">
      <div className="searchbar">
        <form>
          <input type="text" placeholder="Search for a beer" />
          <button type="submit">Go</button>
        </form>
        <div className="list_group" />
      </div>
    </div>
  );
};

export default Search;
