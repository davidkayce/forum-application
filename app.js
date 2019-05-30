const Koa = require('koa-plus')
const { ApolloServer } = require('apollo-server-koa') // Getting the apollo library for koa
const request = require('koa-http-request') // Koa library for making http request on the server

const config = require('./koa-config') // Koa-plus configurations
const router = require('./routes') // Import routes folder 
const typeDefs = require('./graphQL/schema') // Import schema
const resolvers = require('./graphQL/resolvers') // Import schema
 
const server = new ApolloServer({ typeDefs, resolvers }) 
const app = new Koa(config)

server.applyMiddleware({ app }) // Wrap the koa server within the apollo server 
 
async function start () {
  const port = process.env.PORT || 2400 // Set appropriate port based on env variables

  app.use(request({ // koa request
    json: true, //automatic parsing of JSON response
    timeout: 3000,    //3s timeout
  }));

  app.use(router.routes()) // make use of exported routes in the route folder 

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port + `${server.graphqlPath}`)
  })
}

start() 