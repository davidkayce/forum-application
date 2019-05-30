const { gql } = require('apollo-server-koa')

const authorTypes = gql`
  extend type Query {
    getAuthors: [Author]
    getAuthor(id: Int!): Author
  }

  type Subscription { 
    newAuthors: [Author]!
  }

  type Author {
    id: Int!  # '!' here is to ensure its only this type that can be passed
    firstName: String
    lastName: String
    notes: [Note] # You use the schema to show relationship between different types eg here an author can have an array of notes
  }
`

module.exports = authorTypes 
