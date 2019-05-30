const { merge } = require ('lodash')
const author = require('./modules/authors/authorResolver')
const notes = require('./modules/notes/notesResolver')
// Provide resolver functions for your schema fields
// Basically telling what should happen when each property in your type is called

const resolvers = merge({
  Query: {
    hello: () => 'Welcome mofo!!'
  }},
  author.resolvers,
  notes.resolvers )

module.exports = resolvers // Export resolvers