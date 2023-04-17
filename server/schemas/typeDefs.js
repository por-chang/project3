const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    userName: String
    email: String
    password: String
    barks: [Bark]
  }

  type Bark {
    _id: ID
    description: String
    likes: Int
    date: String
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    bark(_id: ID!): Bark
    barks: [Bark]
    users: [User]
    user(_id: ID!): User
    me: User
  }

  type Mutation {
    createUser(userName: String!, email: String!, password: String!): Auth
    createBark(description: String!): Bark
    updateUser(userName: String, email: String, password: String): User
    deleteBark( id: String!): User
    deleteUser: User
    login(email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
