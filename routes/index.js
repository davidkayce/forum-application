const Router = require('koa-router')
const router = new Router() // Base router

const notes = require('./notes')
const posts = require('./posts')
const user = require('./users')
const auth = require('./auth')


router.use('/notes', notes.routes()) // How to nest routes
router.use('/posts', posts.routes()) 
router.use('/user', user.routes()) 
router.use('/auth', auth.routes()) 

router.get('*', async ctx => { // Wildcard catcher (this MUST always be the LAST)
  ctx.body = 'You have requested a wrong route, please check properly'
})

module.exports = router // Export routes