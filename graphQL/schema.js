const { gql } = require('apollo-server-koa') // Getting the apollo library for koa

// Construct a schema, using GraphQL schema language
// The schema specifies thh capabilities of the by determing how a client can fetch or chnage it,
// its like defining a contract between client and server

const typeDefs = gql`
  type Query {
    hello: String
  }
  
  type Mutation {
    hello: String
  }

  type Subscription {
    hello: String
  }

  
`
 
module.exports = typeDefs // Export schema