const app = require('./app')

async function start () {
  const port = process.env.PORT 

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port )
  })
}

start() 