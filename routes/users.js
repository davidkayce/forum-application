const Router = require('koa-router')
const auth = require('../middleware/auth')
const User = require('../models/user')
const user = new Router()

user.get('/', auth, async ctx => {
  try {
    const profile = ctx.request.user
    ctx.body = { status: 'success', profile }
  } catch (e) {
    ctx.throw(500, 'Internal Server Error')
  }
})

user.patch('/', auth, async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['username', 'email', 'password', 'age'] 
  // sets validation rule for what can be edited in a user
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 
  if (!isValidOperation) ctx.throw(404, 'Invalid updates')

  try {
    updates.forEach((update) => ctx.request.user[update] = ctx.request.body[update])
    await ctx.request.user.save()
    ctx.body = ctx.request.user
  } catch (e) {
    ctx.throw(400, e)
  }
})

user.delete('/', auth, async ctx => {
  try {
    await ctx.request.user.remove()
    ctx.body = { status: 'success'}
  } catch (e) {
    ctx.throw(500, 'Internal Server Error')
  }
})

module.exports = user