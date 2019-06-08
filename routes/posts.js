const Router = require('koa-router')
const Post = require('../models/posts')
const auth = require('../middleware/auth')
const posts = new Router() // How to nest routes

posts.get('/', auth, async ctx => {
  try {
    const posts = await Post.find({})
    ctx.body = posts
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.get('/:id', auth, async ctx => {
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

posts.post('/', auth, async ctx => {
  console.log(ctx.request.body)
  const post = new Post({
    ...ctx.request.body,
    author: ctx.request.user._id
  })
  try {
    await post.save()
    ctx.status = 201
    ctx.body = post
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

posts.patch('/:id', auth, async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['title', 'content']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) // sets validation rule for what can be edited in a post

  if (!isValidOperation) {
    ctx.status = 400
    ctx.body = {msg:'Invalid updates'}
  }

  try {
    const post = await Post.findById(ctx.request.params.id)
    updates.forEach((update) => post[update] = ctx.request.body[update])
    await post.save()

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

posts.delete('/:id', auth, async ctx => {
  try {
    const post = await Post.findByIdAndDelete(ctx.request.params.id)
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