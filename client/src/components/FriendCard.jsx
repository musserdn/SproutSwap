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
      <h4>{user.username}</h4>
      <button
        onClick={() => onAddFriend(user._id)}
        className="btn btn-primary"
        disabled={isFriend}
      >
        {isFriend ? (
          <>
            <FaUserCheck className="mr-sm"/>  Friends
          </>
        ) : (
          <>
            <FaUserPlus  className="mr-sm"/>  Add Friend
          </>
        )}
      </button>
    </div>
  );
};

export default FriendCard;