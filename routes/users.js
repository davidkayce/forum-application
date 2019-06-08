const Router = require('koa-router')
const auth = require('../middleware/auth')
const User = require('../models/user')
const user = new Router() // How to nest routes

user.get('/', auth, async ctx => {
  try {
    // const profile = ctx.request.user.populate('post').execPopulate() //Getting all the users posts
    ctx.body = ctx.request.user
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

user.patch('/', auth, async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['username', 'email', 'password', 'age'] 
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // sets validation rule for what can be edited in a user

  if (!isValidOperation) {
    ctx.status = 404
    ctx.body = 'Invalid updates'
  }
  try {
    updates.forEach((update) => ctx.request.user[update] = ctx.request.body[update]) // Since we have the stored user
    await ctx.request.user.save()
    ctx.body = ctx.request.user
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

user.delete('/', auth, async ctx => {
  try {
    const user = await User.findByIdAndDelete(ctx.request.params.id)
    if (!user) {
      ctx.status = 404
      ctx.body = 'emmmmm, seems this user does not exist'
    }
    ctx.body = user
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

module.exports = user