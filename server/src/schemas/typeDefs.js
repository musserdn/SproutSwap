const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    avatar_url: String
    friends: [User]
    garden: [Plant]
  }

  type Plant {
    _id: ID!
    plantApiId: Int
    name: String
    imgUrl: String 
  }

  input PlantInput {
    plantApiId: Int
    name: String
    imgUrl: String 
  }

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    searchUsers(username: String!): [User]
    user(username: String!): User
    me: User
    plant(plantId: ID!): Plant
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
    updateGarden(userId: ID!, plants: [PlantInput]): User 
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
  }
`;

export default typeDefs;
