const { ApolloServer } = require('apollo-server-lambda')
const typeDefs = require('./types')
const resolvers = require('./resolvers')

// To read information about the current request from the API Gateway event  
// (HTTP headers, HTTP method, body, path, ...) or the current Lambda Context
// (Function Name, Function Version, awsRequestId, time remaining, ...), use the options function.

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

// To enable CORS response for requests with credentials 
// (cookies, http authentication), the allow origin and credentials 
// header must be set to true.
exports.graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  }
})