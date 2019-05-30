const { gql } = require('apollo-server-koa') // Getting the apollo library for koa

// Construct a schema, using GraphQL schema language
// The schema specifies thh capabilities of the by determing how a client can fetch or chnage it,
// its like defining a contract between client and server
// GRAPHQL COUTERPART OF NOTES API

const typeDefs = gql`
  type Query { # Query loosely translates to 'GET' in REST 
    hello: String,
    getNotes: [Note], # This says we can query a defined object; Notes
    getAuthors: [Author]
  }
  
  type Mutation { # Mutations could be either 'POST', 'PUT', 'PATCH' or 'DELETE' in REST 
    changeGreeting (message: String): String, # the right side of the colon is what that function is meant to return
    
    " Notes APIs"
    createNote (title: String, author: String, content: String): Note,
    updateNote (title: String, author: String, content: String): Note,
    deleteNote (title: String): String
  }

  type Subscription {
    hello: String
  }

  type Note {
    id: ID!
    title: String,
    author: Author, # You use the schema to show reationship between different types eg here a note has an author
    content: String
  }

  type Author {
    id: ID!
    name: String!, # '!' here is to ensure its only this type that can be passed
    notes: [Note] # You use the schema to show reationship between different types eg here an author can have an array of notes
  }

`
 
module.exports = typeDefs // Export schema