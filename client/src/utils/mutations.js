import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        avatar_url
        garden {
          _id
          name
          plantApiId
          imgUrl
        }
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($input: UserInput!) {
    addUser(input: $input) {
      token
      user {
        _id
        username
        email
        avatar_url
      }
    }
  }
`;

export const ADD_GARDEN = gql`
  mutation addGarden($input: GardenInput!) {
    addGarden(input: $input) {
      _id
      user {
        _id
        username
      }
      plants {
        _id
        name
        plantApiId
        imgUrl
      }
    }
  }
`;

export const ADD_PLANT_TO_GARDEN = gql`
  mutation addPlantToGarden($gardenId: ID!, $plantId: ID!) {
    addPlantToGarden(gardenId: $gardenId, plantId: $plantId) {
      _id
      user {
        _id
        username
      }
      plants {
        _id
        name
        plantApiId
        imgUrl
      }
    }
  }
`;

export const REMOVE_PLANT_FROM_GARDEN = gql`
  mutation removePlantFromGarden($gardenId: ID!, $plantId: ID!) {
    removePlantFromGarden(gardenId: $gardenId, plantId: $plantId) {
      _id
      user {
        _id
        username
      }
      plants {
        _id
        name
        plantApiId
        imgUrl
      }
    }
  }
`;

export const UPDATE_GARDEN = gql`
  mutation updateGarden($userId: ID!, $plantIds: [ID!]) {
    updateGarden(userId: $userId, plantIds: $plantIds) {
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

export const ADD_FRIEND = gql`
  mutation addFriend($friendId: ID!) {
    addFriend(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
        avatar_url
      }
    }
  }
`;

export const REMOVE_FRIEND = gql`
  mutation removeFriend($friendId: ID!) {
    removeFriend(friendId: $friendId) {
      _id
      username
      friends {
        _id
        username
        avatar_url
      }
    }
  }
`;