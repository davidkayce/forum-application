const Koa = require('koa-plus')
require('dotenv').config({ path:'variables.env'})
require('./db')
const router = require('./routes') 

const app = new Koa({
  body: {
    jsonLimit: '10kb',
    multipart: true,
    urlencoded: true, 
    hash: 'md5',
    formidable: {
      uploadDir: './uploads',
      maxFileSize: 0.5 * 1024 * 1024 // 500kb
    }
  },
  // Sets the threshold to Gzip responses at 2k (2048 bytes)
  compress: { threshold: 2048 }, 
  cors: { origin: '*' }, 
  debug: { name: 'worker' }, 
  helmet: {
    noCache: true,  // Sets the `Cache-Control` headers to prevent caching
    frameguard: {
      action: 'deny' // Set the `X-Frame-Options' header to be `DENY`
    }
  },
  json: { pretty: false }, 
  logger: { format: 'dev' }
})

app.use(router.routes()) 

module.exports = app