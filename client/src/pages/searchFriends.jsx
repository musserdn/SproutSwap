import React from "react";

const FriendsSearch = () => {
  return (
    <div className="friends-search">
      <h2>Find Fellow Gardeners</h2>
      <div className="search-bar">
        <input type="text" placeholder="Search for gardeners..." />
        <button>Search</button>
      </div>

      <div className="search-results">
        {/* Placeholder for search results */}
      </div>

      <h3>My Friends</h3>
      <ul>
        {/* Placeholder for the user's friends list */}
      </ul>
    </div>
  );
};

export default FriendsSearch;
