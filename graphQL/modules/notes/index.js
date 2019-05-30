const { gql } = require('apollo-server-koa')

const noteTypes = gql`
  extend type Query { 
    getNotes: [Note], # This says we can query a defined object; Notes
    getSingleNote(id: Int!): Note
  }

  extend type Subscription {
    newNotes: [Note]!
  }

  type Mutation { # Mutations could be either 'POST', 'PUT', 'PATCH' or 'DELETE' in REST 
    # Notes APIs
    createNote (title: String!, author: String!, content: String!): Note,
    updateNote (title: String!, author: String!, content: String!): Note,
    deleteNote (title: String!): String!
  }

  type Note {
    id: Int!
    title: String,
    author: Author, # You use the schema to show reationship between different types eg here a note has an author
    content: String
  }
`

module.exports = noteTypes