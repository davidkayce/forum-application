const Router = require('koa-router')
const weather = new Router() // How to nest routes

// Geocoding experiment to get weather
weather.get('/', async ctx => {
  if (!ctx.params.title) { 
    ctx.body = {
      error: 'You need to pass in a title' 
    }
  } else {
    try {
      const title = ctx.params.title
      const notes = loadNotes()
      ctx.body = notes.find((note) => note.title === title)
    } catch (error) {
      ctx.body = 'error: ' + error
    }
  }
})

module.exports = weather // Export routes