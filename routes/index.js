const Router = require('koa-router')
const router = new Router() // Base router
const notes = require('./notes')


router.use('/api/notes', notes.routes()) // How to nest routes

router.get('*', async ctx => { // Wildcard catcher (this MUST always be the LAST)
  ctx.body = 'You have requested a wrong route, please check properly'
})

module.exports = router // Export routes