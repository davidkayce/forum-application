const fs = require('fs')
const path = require('path')

const http = require('http')
const Koa = require('koa-plus')

require('dotenv').config({ path:'variables.env'})
require('./db')
const router = require('./routes') 
const template = fs.readFileSync(path.resolve(__dirname, './client/index.html'))

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
const server = http.createServer(app.callback())
// Setting up socket.io for ws bi-directional communication
// Socket.io has to latch unto the raw http instance, hence the refactoring
const io = require('socket.io')(server)

app.use(async (ctx) => {
  ctx.type = 'html'
  ctx.body = template
})

app.use(router.routes()) 

io.on('connection', (socket) => {
  console.log('New websocket connection')

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })
})

module.exports = server