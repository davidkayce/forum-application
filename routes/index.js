const Router = require('koa-router')
const router = new Router() // Base router

const notes = require('./notes')
const posts = require('./posts')
const users = require('./users')
const auth = require('./auth')


router.use('/api/notes', notes.routes()) // How to nest routes
router.use('/api/posts', posts.routes()) 
router.use('/api/users', users.routes()) 
router.use('/api/auth', auth.routes()) 

router.get('*', async ctx => { // Wildcard catcher (this MUST always be the LAST)
  ctx.body = 'You have requested a wrong route, please check properly'
})

module.exports = router // Export routes