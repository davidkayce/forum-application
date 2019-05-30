const { gql } = require('apollo-server-koa') // Getting the apollo library for koa
const authorTypes = require('./modules/authors')
const noteTypes = require('./modules/notes')

// Construct a schema, using GraphQL schema language
// The schema specifies thh capabilities of the by determing how a client can fetch or chnage it,
// its like defining a contract between client and server
// GRAPHQL COUTERPART OF NOTES API

const Query = gql`
  type Query { # Query loosely translates to 'GET' in REST 
    hello: String,
  } 
`
const typeDefs = [Query, authorTypes, noteTypes]
module.exports = typeDefs // Export schema