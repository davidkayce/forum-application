const Router = require('koa-router')
const User = require('../models/user')
const authn = require('../middleware/auth')
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

auth.get('/logout', authn,  async ctx => { // We want to make sure you are logged in to be able to logout
  try {
    ctx.request.user.tokens = ctx.request.user.tokens.filter((token) => {
      return token.token !== ctx.request.token
    })
    await ctx.request.user.save() // Save only the tokens that do not match the current one, basically deleting the token
    ctx.body = 'You have been logged out'
  } catch (error) {
    ctx.status = 500
  }
})

auth.get('/logout-all', authn,  async ctx => { 
  try {
    ctx.request.user.tokens = [] // Set all tokens to empty array , basically wiping everything
    await ctx.request.user.save() 
    ctx.body = 'You have logged all em mofos out'
  } catch (error) {
    ctx.status = 500
  }
})


module.exports = auth