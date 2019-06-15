const Router = require('koa-router')
const User = require('../models/user')
const authn = require('../middleware/auth')
const { sendWelcomeEmail, sendLoginMail } = require('../services/emails')
const auth = new Router()

auth.post('/signup', async ctx => {
  const user = new User(ctx.request.body)
  try {
    await user.save()
    sendWelcomeEmail(user.email, user.username) // Send email
    ctx.status = 201
    ctx.body = user
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

auth.post('/login', async ctx => {
  try {
    let user = await User.checkCredentials(ctx.request.body.email, ctx.request.body.password)
    let token = await user.generateToken()
    let refreshToken = await user.refreshToken()
    sendLoginMail(user.email, user.username) // Send login Email
    ctx.body = { user, token, refreshToken }
  } catch (err) {
    ctx.throw(400, 'The supplied credentials are invalid')
  }
})

auth.post('/refresh', async ctx => {
  try {
    const token = ctx.request.body.token
    const decoded = jwt.verify(token, process.env.API_REFRESH)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // check for a user with the id in the JWT and the right token

    if (!user) ctx.throw(400, 'This user does not exist')
    let newToken = user.generateToken()
    ctx.body = newToken
  } catch (err) {
    ctx.throw(400, 'The supplied credentials are invalid')
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
    ctx.throw(500)
  }
})

auth.get('/logout-all', authn,  async ctx => { 
  try {
    ctx.request.user.tokens = [] // Set all tokens to empty array , basically wiping everything
    await ctx.request.user.save() 
    ctx.body = 'You have logged all em mofos out'
  } catch (error) {
    ctx.throw(500)
  }
})


module.exports = auth