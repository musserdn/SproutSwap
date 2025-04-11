const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    friends: [User]
    garden: Garden
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

  type Garden {
    _id: ID!
    user: User
    plants: [Plant]
  }

  type Plant {
    _id: ID!
    plantApiId: String
    name: String
    imgUrl: String 
  }

  type Query {
    users: [User]
    user(username: String!): User
    me: User
    plant(plantId: ID!): Plant
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth
  }
`;

export default typeDefs;
