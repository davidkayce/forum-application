const Koa = require('koa-plus')
const router = require('./routes')
const request = require('koa-http-request')
const Gun = require('gun'); // added Gun DB 


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

async function start () {
  const host = process.env.HOST || '127.0.0.1'
  const port = process.env.PORT || 2400

  // koa request
  app.use(request({
    json: true, //automatically parsing of JSON response
    timeout: 3000,    //3s timeout
  }));

  // error handling
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = err.message;
      ctx.app.emit('error', err, ctx);
    }
  });

  app.use(router.routes())

  app.listen (port, host)
  console.log(`Server is running on port: ` + port + ` and host: ` + host)
}

start() 