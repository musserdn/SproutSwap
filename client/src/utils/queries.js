import { gql } from "@apollo/client";

// Get authenticated user with all fields
export const ME = gql`
  query Me {
    me {
      _id
      username
      email
      avatar_url
      friends {
        _id
        username
        avatar_url
      }
      garden {
        _id
        name
        plantApiId
        imgUrl
      }
    }
  }
`;

// Get all users (basic info)
export const ALL_USERS = gql`
  query AllUsers {
    users {
      _id
      username
      avatar_url
    }
  }
`;

// Get detailed info for specific user
export const GET_USER = gql`
  query GetUser($username: String!) {
    user(username: $username) {
      _id
      username
      avatar_url
      friends {
        _id
        username
        avatar_url
      }
      garden {
        _id
        name
        plantApiId
        imgUrl
      }
    }
  }
`;

// Search users by username
export const SEARCH_USERS = gql`
  query SearchUsers($username: String!) {
    searchUsers(username: $username) {
      _id
      username
      avatar_url
      email
    }
  }
`;

// Since garden is now embedded in User, this query gets a user's garden
export const USER_GARDEN = gql`
  query UserGarden($username: String!) {
    user(username: $username) {
      _id
      username
      garden {
        _id
        name
        plantApiId
        imgUrl
      }
    }
  }
`;
