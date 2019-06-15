const Router = require('koa-router')
const User = require('../models/user')
const authn = require('../middleware/auth')
const emailService = require('../services/emailService')
const auth = new Router()

auth.post('/signup', async ctx => {
  const user = new User(ctx.request.body)
  try {
    await user.save()
    emailService.sendWelcomeEmail(user.email, user.username) 
    ctx.status = 201
    ctx.body = { status: 'success', user }
  } catch (e) {
    ctx.throw(400, e)
  }
})

auth.post('/login', async ctx => {
  try {
    let user = await User.checkCredentials(ctx.request.body.email, ctx.request.body.password)
    let token = await user.generateToken()
    let refreshToken = await user.refreshToken()
    emailService.sendLoginMail(user.email, user.username) 
    ctx.body = { status: 'success', user, token, refreshToken }
  } catch (err) {
    ctx.throw(400, 'The supplied credentials are invalid')
  }
})

auth.post('/refresh', async ctx => {
  try {
    const token = ctx.request.body.token
    const decoded = jwt.verify(token, process.env.API_REFRESH)
    // check for a user with the id in the JWT and the right token
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) 
    if (!user) ctx.throw(400, 'This user does not exist')

    let newToken = user.generateToken()
    ctx.body = newToken
  } catch (err) {
    ctx.throw(400, 'The supplied credentials are invalid')
  }
})

// We want to make sure you are logged in to be able to logout
auth.get('/logout', authn,  async ctx => { 
  try {
    ctx.request.user.tokens = ctx.request.user.tokens.filter((token) => token.token !== ctx.request.token)
    // Save only the tokens that do not match the current one, basically deleting the token
    await ctx.request.user.save() 
    ctx.body = { status: 'Success' }
  } catch (error) {
    ctx.throw(500)
  }
})

auth.get('/logout-all', authn,  async ctx => { 
  try {
    // Set all tokens to empty array , basically wiping everything
    ctx.request.user.tokens = [] 
    await ctx.request.user.save() 
    ctx.body = { status: 'Success' }
  } catch (error) {
    ctx.throw(500, 'Internal Server Error')
  }
})


module.exports = auth