const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Label {
    key: String!
    value: String!
  }

  type Value {
    value: Float!
    timestamp: String!
  }

  type Metric {
    _id: ID
    name: String!
    labels: [Label!]!
    values: [Value!]!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    userById(userId: ID): User
    metricById(metricId: ID): Metric
    metrics: [Metric]!
  }

  type Mutation {
    addUser(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): Auth
    updateUser(firstName: String, lastName: String, email: String): User
    login(email: String!, password: String!): Auth
    addMetric(
      name: String!
      labels: [LabelInput!]!
      values: [ValueInput!]!
    ): Metric
  }

  input LabelInput {
    key: String!
    value: String!
  }

  input ValueInput {
    value: Float!
    timestamp: String!
  }
`;

module.exports = typeDefs;
