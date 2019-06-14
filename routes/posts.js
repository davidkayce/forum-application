const Router = require('koa-router')
const Post = require('../models/posts')
const auth = require('../middleware/auth')
const posts = new Router() // How to nest routes

posts.get('/all', auth, async ctx => { // Get all posts even those that aren't yours
  try {
    const posts = await Post.find({}).populate('author').execPopulate()
    ctx.body = posts
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.get('/', auth, async ctx => {
  // Adding pagination and filtering 
  const match = {}

  if (ctx.request.query.title) { // (filter by title)
    match.title = ctx.request.query.title
  }

  try {
    await ctx.request.user.populate({
      path: 'tasks',
      match
    }).execPopulate()
    ctx.body = ctx.request.user.posts
  } catch (e) {
    ctx.status = 500
    ctx.body = 'Internal server error'
  }
})

posts.get('/:id', auth, async ctx => {
  try {
    const post = await Post.findOne({ _id: ctx.params.id, author: ctx.request.user._id }) // Filter posts gotten according to user
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