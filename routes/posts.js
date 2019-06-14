const Router = require('koa-router')
const Post = require('../models/posts')
const auth = require('../middleware/auth')
const posts = new Router() // How to nest routes

posts.get('/all', auth, async ctx => { // Get all posts even those that aren't yours
  try {
    const posts = await Post.find({}).populate('author').exec()
    ctx.body = posts
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.get('/', auth, async ctx => {
  try {
    const posts = await Post.find({ author: ctx.request.user._id }).populate('author').exec()
    ctx.body = posts
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.get('/:id', auth, async ctx => {
  try {
    const post = await Post.findOne({ _id: ctx.params.id, author: ctx.request.user._id }).populate('author').exec() // Filter posts gotten according to user
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
  const post = new Post({
    ...ctx.request.body,
    author: ctx.request.user._id
  })
  try {
    await post.save()
    console.log('I saved')
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
    const post = await Post.findOne({ _id: ctx.params.id, author: ctx.request.user._id })
    
    if (!post) {
      ctx.status = 404
      ctx.body = {msg:'emmmmmmm, seems 404'}
    }

    updates.forEach((update) => post[update] = ctx.request.body[update])
    await post.save()
    ctx.body = post
  } catch (e) {
    ctx.status = 400
    ctx.body = e
  }
})

posts.delete('/:id', auth, async ctx => {
  try {
    const post = await Post.findOneAndDelete({ _id: ctx.params.id, author: ctx.request.user._id })
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