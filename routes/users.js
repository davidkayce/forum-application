const Router = require('koa-router')
const User = require('../models/user')
const user = new Router() // How to nest routes

user.get('/', async ctx => {
  try {
    const users = await User.find({})
    ctx.body = users
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

user.get('/:id', async ctx => {
  const _id = ctx.params.id
  try {
    const user = await User.findById(_id)
    if (!user) {
      ctx.status = 404
      ctx.body = {msg:'emmmmmmm, seems 404'};
    }
    ctx.body = user
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

user.post('/', async ctx => {
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

user.patch('/:id', async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    ctx.status = 404
    ctx.body = 'Invalid updates'
  }
  try {
    const user = await User.findById(ctx.request.params.id)
    updates.forEach((update) => user[update] = ctx.request.body[update])
    await user.save()

    if (!user) {
      ctx.status = 404
      ctx.body = 'emmmmm, seems this user does not exist'
    }

    ctx.body = user
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

user.delete('/:id', async ctx => {
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