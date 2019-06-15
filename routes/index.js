const Router = require('koa-router')
const router = new Router()

const auth = require('./auth')
const notes = require('./notes')
const posts = require('./posts')
const upload = require('./uploads')
const user = require('./users')

// How to nest routes
router.use('/auth', auth.routes())
router.use('/notes', notes.routes()) 
router.use('/posts', posts.routes()) 
router.use('/profile', user.routes()) 
router.use('/upload', upload.routes()) 

// Wildcard catcher (this MUST always be the LAST)
router.get('*', async ctx => { 
  ctx.body = 'You have requested a wrong route, please check properly'
})

module.exports = router 