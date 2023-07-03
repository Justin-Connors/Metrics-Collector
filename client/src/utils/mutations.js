import { gql } from "@apollo/client";

// Mutation for Logging in a user
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

// Mutation to add a user
export const ADD_USER = gql`
  mutation addUser(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    addUser(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      token
      user {
        _id
      }
    }
  }
`;

// Mutation to add Metrics
export const ADD_METRICS = gql`
  mutation addMetric($name: String!, $labels: [String]!, $values: [String]!) {
    addMetric(name: $name!, labels: $labels!, values: $values!) {
      _id
      name
      labels
      values
    }
  }
`;
