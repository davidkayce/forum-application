
// Provide resolver functions for your schema fields
// Basically telling what should happen when each property in your type is called

const resolvers = {
  Query: {
    hello: () => 'Welcome mofo!!'
    
  },
}

module.exports = resolvers // Export resolvers