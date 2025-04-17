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
    plantApiId: String
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
    updateGarden(userId: ID!, plantIds: [ID!]): User 
    addFriend(friendId: ID!): User
    removeFriend(friendId: ID!): User
  }
`;

export default typeDefs;
