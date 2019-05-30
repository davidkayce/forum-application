const Koa = require('koa-plus')
const router = require('./routes')
const request = require('koa-http-request')
const { ApolloServer, gql } = require('apollo-server-koa')

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers });
 
const app = new Koa({
  // Configuration for koa-plus
  body: {
    jsonLimit: '10kb' // Sets the json request body limit to 10k
  },
  compress: {
    threshold: 2048 // Sets the threshold to Gzip responses at 2k (2048 bytes)
  },
  cors: {
    origin: '*' // Set the `Access-Control-Allow-Origin` header to be `*`
  },
  debug: {
    name: 'worker' // Set the debug logger name
  },
  helmet: {
    noCache: true,  // Sets the `Cache-Control` headers to prevent caching
    frameguard: {
      action: 'deny' // Set the `X-Frame-Options' header to be `DENY`
    }
  },
  json: {
    pretty: false // Disables pretty-printing
  },
  logger: {
    format: 'dev' // Use the `dev` format of logging
  }
})

server.applyMiddleware({ app });
 
async function start () {
  const port = process.env.PORT || 2400

  // koa request
  app.use(request({
    json: true, //automatically parsing of JSON response
    timeout: 3000,    //3s timeout
  }));

  app.use(router.routes())

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port + `${server.graphqlPath}`)
  })
}

start() 