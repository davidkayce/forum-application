const app = require('./app')
const router = require('./routes') 

async function start () {
  const port = process.env.PORT  // Set appropriate port based on env variables

  app.use(router.routes()) // make use of exported routes in the route folder 

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port )
  })
}

start() 