import { gql } from "@apollo/client";

// User query to get user data
export const QUERY_USER = gql`
  query user {
    user {
      _id
      firstName
      lastName
      email
    }
  }
`;

// User query to get user data by ID
export const QUERY_USER_BY_ID = gql`
  query userById($userId: ID!) {
    userById(userId: $userId) {
      _id
      firstName
      lastName
      email
    }
  }
`;

// Query to get all metrics
export const QUERY_METRICS = gql`
  query metrics {
    metrics {
      _id
      name
      labels
      values
    }
  }
`;

// Query to get a single metric
export const QUERY_METRICS_BY_ID = gql`
  query metric($id: ID!) {
    metric(id: $id) {
      _id
      name
      labels
      values
    }
  }
`;
