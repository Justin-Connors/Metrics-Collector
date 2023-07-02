const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Metric {
    _id: ID
    name: String
    value: [Int]
    timestamp: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    userById(userId: ID): User
    metrics: [Metric]
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(
      firstName: String
      lastName: String
      email: String
      bio: String
      profilePicUrl: String
      bannerUrl: String
    ): User
    login(email: String!, password: String!): Auth
    addMeteric(name: String!, value: [Int]!): Metric
  }
`;

module.exports = typeDefs;
