const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    id: ID!
    name: String!
  },

  type Query {
    Users: [User!]!
  },

  type Mutation {
    addUser(name: String!, password: String!):User
  }
 
`;

module.exports = typeDefs;