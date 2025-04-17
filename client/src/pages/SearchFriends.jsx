import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import styles from "./SearchFriends.module.css";
import SearchBar from "../components/SearchBar";
import FriendCard from "../components/FriendCard";
import { SEARCH_USERS } from "../utils/queries";

const FriendsSearch = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // Mock data for friends (replace with actual logic later)
  const [myFriends, setMyFriends] = useState([]);
  
  const [searchUsers, { loading: queryLoading, error: queryError }] = useLazyQuery(SEARCH_USERS, {
    onCompleted: (data) => {
      setSearchResults(data.searchUsers || []);
      setLoading(false);
    },
    onError: (error) => {
      setError(error.message);
      setLoading(false);
    }
  });

  const handleSearch = async (searchTerm) => {
    setLoading(true);
    setError(null);

    try {
      await searchUsers({ 
        variables: { username: searchTerm } 
      });
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleAddFriend = (userId) => {
    // This is a placeholder - replace with actual friend adding mutation
    console.log(`Adding friend with ID: ${userId}`);
    
    // For demo purposes - find the user and add to friends
    const userToAdd = searchResults.find(user => user._id === userId);
    if (userToAdd && !myFriends.some(friend => friend._id === userId)) {
      setMyFriends([...myFriends, userToAdd]);
    }
  };

  const isFriend = (userId) => {
    return myFriends.some(friend => friend._id === userId);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Find Fellow Gardeners</h2>

      <div className={styles.searchBar}>
        <SearchBar onSearch={handleSearch} placeholder="Search for gardeners..." />
      </div>

      <div className={styles.searchResults}>
        {loading && <p className={styles.loadingText}>Searching...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        
        {searchResults.length > 0 && (
          <>
            <h3 className={styles.sectionTitle}>Search Results</h3>
            <div className={styles.cardGrid}>
              {searchResults.map(user => (
                <FriendCard 
                  key={user._id}
                  user={user}
                  isFriend={isFriend(user._id)}
                  onAddFriend={handleAddFriend}
                />
              ))}
            </div>
          </>
        )}
        
        {!loading && !error && searchResults.length === 0 && (
          <p className={styles.emptyMessage}>No users found. Try a different search term.</p>
        )}
      </div>

      <div className={styles.friendsSection}>
        <h3 className={styles.sectionTitle}>My Friends</h3>
        
        {myFriends.length > 0 ? (
          <div className={styles.cardGrid}>
            {myFriends.map(friend => (
              <FriendCard 
                key={friend._id}
                user={friend}
                isFriend={true}
                onAddFriend={() => {}}
              />
            ))}
          </div>
        ) : (
          <p className={styles.emptyMessage}>
            You don't have any friends yet. Start by searching above!
          </p>
        )}
      </div>
    </div>
  );
};

export default FriendsSearch;
