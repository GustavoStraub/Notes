const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    email: String!
    notes: [Notes!]
  },

  type Notes {
    id: ID!
    title: String!
    note: String!
    user: User
  }

  type Query {
    Users: [User!]!
    User(id: ID!): User
    Notes: [Notes!]!
  },

  type Mutation {
    addUser(name: String!, email:String!, password: String!):User
    addNote(title: String!, note: String!, userId: String!):Notes
  }
 
`;

module.exports = typeDefs;