import React from "react";
import styles from "./SearchFriends.module.css";

const FriendsSearch = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find Fellow Gardeners</h2>

      <div className={styles.searchBar}>
        <input type="text" placeholder="Search for gardeners..." />
        <button>Search</button>
      </div>

      <div className={styles.searchResults}>
        {/* Placeholder for search results */}
      </div>

      <h3>My Friends</h3>
      <ul className={styles.friendsList}>
        {/* Placeholder for the user's friends list */}
      </ul>
    </div>
  );
};

export default FriendsSearch;
