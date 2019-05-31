const { ApolloServer } = require('apollo-server-lambda')
const typeDefs = require('./types')
const resolvers = require('./resolvers')


const server = new ApolloServer({ 
  typeDefs, 
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context,
  })
})

exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  }
})