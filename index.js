const server = require('./app')

async function start () {
  const port = process.env.PORT 

  server.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port )
  })
}

start() 