import React from "react";
import { FaUserPlus, FaUserCheck } from "react-icons/fa";
import styles from "./FriendCard.module.css";

const FriendCard = ({ user, isFriend, onAddFriend }) => {
  return (
    <div className={styles.friendCard}>
      <div className={styles.imageContainer}>
        <img
          src={user.avatar_url || "https://via.placeholder.com/150"}
          alt={`${user.username}'s avatar`}
          className={styles.avatar}
        />
      </div>
      <h3 className={styles.username}>{user.username}</h3>
      <button
        onClick={() => onAddFriend(user._id)}
        className={`${styles.actionButton} ${isFriend ? styles.friendAdded : ""}`}
        disabled={isFriend}
      >
        {isFriend ? (
          <>
            <FaUserCheck className={styles.icon} /> Friends
          </>
        ) : (
          <>
            <FaUserPlus className={styles.icon} /> Add Friend
          </>
        )}
      </button>
    </div>
  );
};

export default FriendCard;