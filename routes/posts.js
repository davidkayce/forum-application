const Router = require('koa-router')
const Post = require('../models/posts')
const posts = new Router() // How to nest routes

posts.get('/', async ctx => {
  try {
    const posts = await Post.find({})
    ctx.body = posts
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.get('/:id', async ctx => {
  const _id = ctx.params.id
  try {
    const post = await Post.findById(_id)
    if (!post) {
      ctx.status = 404
      ctx.body = {msg:'emmmmmmm, seems 404'};
    }
    ctx.body = post
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.post('/', async ctx => {
  const post = new Post(ctx.request.body)
  try {
    await post.save()
    ctx.status = 201
    ctx.body = post
  } catch (e) {
    ctx.status = 201
    ctx.body = e
  }
})

posts.patch('/:id', async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    ctx.status = 400
    ctx.body = {msg:'Invalid updates'}
  }

  try {
    const post = await post.findByIdAndUpdate(ctx.request.params.id, ctx.request.body, { new: true, runValidators: true })
    if (!post) {
      ctx.status = 404
      ctx.body = {msg:'emmmmmmm, seems 404'}
    }
    ctx.body = post
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

posts.delete('/:id', async ctx => {
  try {
    const post = await post.findByIdAndDelete(ctx.request.params.id)
    if (!post) {
      ctx.status = 404
      ctx.body = {msg:'emmmmmmm, seems 404'}
    }
    ctx.body = post
  } catch (e) {
    ctx.status = 404
    ctx.body = {msg:'Internal Server Error'}
  }
})

module.exports = posts