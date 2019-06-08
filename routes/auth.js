const Router = require('koa-router')
const User = require('../models/user')
const auth = new Router()

auth.post('/signup', async ctx => {
  const user = new User(ctx.request.body)
  try {
    await user.save()
    ctx.status = 201
    ctx.body = user
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

auth.post('/login', async ctx => {
  try {
    const user = await User.checkCredentials(ctx.request.body.email, ctx.request.body.password)
    const token = await user.generateToken()
    ctx.body = { user, token }
  } catch (err) {
    ctx.status = 400
    ctx.body = 'The supplied credentials are incorrect'
  }
})

auth.post('/logout', async ctx => {

})

module.exports = auth