import { gql } from "@apollo/client";

// 'my garden'
export const ME = gql`
  Query Me {
    me {
      garden
      email
      friends
    }
  }
`;

export const ALL_USERS = gql``; // gets called first

export const GET_USER = gql``; // uses data from ALL_USERS

export const USER_GARDEN = gql``; // uses gardenId from GET_USER

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
export const USER_GARDEN = gql`
  
`;

// uses gardenId from GET_USER
