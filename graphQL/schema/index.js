const { gql } = require('apollo-server-koa') // Getting the apollo library for koa

// Construct a schema, using GraphQL schema language

const typeDefs = gql`
  type Query {
    hello: String
  }
`
 
module.exports = typeDefs // Export schema