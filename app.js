const Koa = require('koa')
const { ApolloServer } = require('apollo-server-koa') // Getting the apollo library for koa
const bodyParser = require('koa-body')

const router = require('./routes') // Import routes folder 
const logger = { log: e => console.log(e) } // Log errors from apollo

const typeDefs = require('./graphQL/schema') // Import schema
const resolvers = require('./graphQL/resolvers') // Import schema
 
const server = new ApolloServer({ typeDefs, resolvers }) 
const app = new Koa()

server.applyMiddleware({ 
  app, 
  path: '/api',
  introspection: true, }) // Wrap the koa server within the apollo server 
 
async function start () {
  const port = process.env.PORT || 2400 // Set appropriate port based on env variables

  app.use(bodyParser)

  app.use(router.routes()) // make use of exported routes in the route folder 

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port + `${server.graphqlPath}`)
  })
}

start() 