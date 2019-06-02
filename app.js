const Koa = require('koa-plus')
const mongoose = require('mongoose')
require('dotenv').config({ path:'variables.env'})

const router = require('./routes') // Import routes folder 

const app = new Koa({
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

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(() => console.log('🥁 DB connected'))
  .catch((err) => console.error(err))

async function start () {
  const port = process.env.PORT || 2400 // Set appropriate port based on env variables
  app.use(router.routes()) // make use of exported routes in the route folder 

  app.listen ({ port }, () => {
    console.log(`🚀 Server ready at http://localhost:` + port )
  })
}

start() 