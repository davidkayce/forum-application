const Router = require('koa-router')
const user = new Router() // How to nest routes

user.get('/users', async ctx => {
  try {
    const users = await User.find({})
    ctx.body = users
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

user.get('/users/:id', async ctx => {
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

user.patch('/users/:id', async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['name', 'email', 'password', 'age']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    ctx.status = 404
    ctx.body = 'Invalid updates'
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
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

user.delete('/users/:id', async ctx => {
  try {
    const user = await User.findByIdAndDelete(req.params.id)
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