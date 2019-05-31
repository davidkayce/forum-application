const Koa = require('koa')
const bodyParser = require('koa-body')

const router = require('./routes') // Import routes folder 
const app = new Koa()

async function start () {
  const port = process.env.PORT || 2400 // Set appropriate port based on env variables

  app.use(bodyParser)

  app.use(router.routes()) // make use of exported routes in the route folder 

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port )
  })
}

start() 