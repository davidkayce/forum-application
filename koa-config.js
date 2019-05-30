module.exports = {

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

}