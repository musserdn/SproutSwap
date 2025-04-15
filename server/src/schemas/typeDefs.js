const typeDefs = `
  type User {
    _id: ID
    username: String
    email: String
    password: String
    avatar_url: String
    friends: [User]
    garden: Garden
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

  input UserInput {
    username: String!
    email: String!
    password: String!
  }

  input GardenInput {
    userId: ID!
    plantIds: [ID!]
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
    garden(gardenId: ID!): Garden
    gardens: [Garden]
  }

  type Mutation {
    addUser(input: UserInput!): Auth
    login(email: String!, password: String!): Auth

    addGarden(input: GardenInput!): Garden
    addPlantToGarden(gardenId: ID!, plantId: ID!): Garden
    removePlantFromGarden(gardenId: ID!, plantId: ID!): Garden
  }
`;

export default typeDefs;
