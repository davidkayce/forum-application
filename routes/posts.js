const Router = require('koa-router')
const Post = require('../models/posts')
const auth = require('../middleware/auth')
const posts = new Router()

posts.get('/all', auth, async ctx => { 
  const match = {}
  // (filter by title)
  if (ctx.request.query.title) { 
    match.title = ctx.request.query.title
  }

  try {
    const posts = await Post.find({
      match,
      options: {
        // Limit of posts to send
        limit: parseInt(ctx.request.query.limit) || 15, 
        // Skip * number of entries
        skip: parseInt(ctx.request.query.skip) || 0, 
        sort: {
          // descending ie newest first
          createdAt: -1 
        }
      }
    })
    ctx.body = { status: 'success', posts }
  } catch (e) {
    ctx.throw(500, 'Internal Server Error')
  }
})

posts.get('/', auth, async ctx => {
  const match = {}
  if (ctx.request.query.title) { 
    match.title = ctx.request.query.title
  }

  try {
    await ctx.request.user.populate({
      path: 'tasks',
      match,
      options: {
        limit: parseInt(ctx.request.query.limit) || 10,
        skip: parseInt(ctx.request.query.skip) || 0, 
        sort: {
          createdAt: -1
        }
      }
    }).execPopulate()
    ctx.body = ctx.request.user.posts
  } catch (e) {
    ctx.throw(500, 'Internal Server Error')
  }
})

posts.get('/:id', auth, async ctx => {
  try {
    const post = await Post.findOne({ _id: ctx.params.id, author: ctx.request.user._id }) 
    if (!post) ctx.throw(404, 'This post does not exist')
    ctx.body = { status: 'success', post }
  } catch (e) {
    ctx.throw(500, 'Internal Server Error')
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
    ctx.body = { status: 'success', post }
  } catch (e) {
    ctx.throw(400, e)
  }
})

posts.patch('/:id', auth, async ctx => {
  const updates = Object.keys(ctx.request.body)
  const allowedUpdates = ['title', 'content']
  // sets validation rule for what can be edited in a post
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update)) 

  if (!isValidOperation) ctx.throw(400, 'Invalid updates')

  try {
    const post = await Post.findOne({ _id: ctx.params.id, author: ctx.request.user._id })
    if (!post) ctx.throw(400, 'Cannot find this post')
    updates.forEach((update) => post[update] = ctx.request.body[update])
    await post.save()
    ctx.body = { status: 'success', post }
  } catch (e) {
    ctx.throw(400, e)
  }
})

posts.delete('/:id', auth, async ctx => {
  try {
    const post = await Post.findOneAndDelete({ _id: ctx.params.id, author: ctx.request.user._id })
    if (!post) ctx.throw(400, 'Cannot find this post')
    ctx.body = { status: 'success' }
  } catch (e) {
    ctx.throw(500, 'Internal Server Error')
  }
})

module.exports = posts