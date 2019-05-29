const Router = require('koa-router')
const router = new Router() // Base router
const users = require('./users')
const notes = require('./notes')
const weather = require('./weather')

router.use('/api/users', users.routes()) // How to nest routes
router.use('/api/notes', notes.routes()) 
router.use('/api/weather', weather.routes()) 

router.get('*', async ctx => { // Wildcard catcher (this MUST always be the LAST)
  ctx.body = 'You have requested a wrong route, please check properly'
})

module.exports = router // Export routes