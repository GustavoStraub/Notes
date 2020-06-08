const { gql } = require('apollo-server');

const typeDefs = gql`

  type User {
    id: ID!
    name: String!
    email: String!
    notes: [Notes!]
    token: String
  },

  type Notes {
    id: ID!
    title: String!
    note: String!
    user: User
  }

  type Query {
    # Users Queries
    Users: [User!]!
    User(id: ID, email:String): User
    Login(email: String!, password:String): User

    # Notes Queries
    Notes: [Notes!]!
    Note(id:ID!): Notes!
  },

  type Mutation {
    # User mutations
    addUser(name: String!, email:String!, password: String!):User
    editUser(id: String, name: String, email:String, password:String):User
    deleteUser(id: String, email:String):User
    # Notes Mutations
    addNote(title: String!, note: String!, userId: String!):Notes
    editNote(id: String,title: String, note:String):Notes
    deleteNote(id:String!):Notes
  }
 
`;

module.exports = typeDefs;