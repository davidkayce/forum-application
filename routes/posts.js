const Router = require('koa-router')
const posts = new Router() // How to nest routes
const Post = require('../models/posts')

posts.get('/posts', async ctx => {
  try {
    const posts = await Post.find({})
    ctx.status = 200
    ctx.body = posts
  } catch (e) {
    ctx.status = 500
  }
})


posts.get('/posts/:id', async ctx => {
  const _id = ctx.params.id

  try {
    const post = await Post.findById(_id)

    if (!post) {
      return ctx.status(404).body()
    }

    res.send(post)
  } catch (e) {
    res.status(500).send()
  }
})


posts.post('/posts', async ctx => {
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


posts.patch('/posts/:id', async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['description', 'completed']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }

  try {
    const post = await post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

    if (!post) {
      return res.status(404).send()
    }

    res.send(post)
  } catch (e) {
    res.status(400).send(e)
  }
})


posts.delete('/posts/:id', async (req, res) => {
  try {
    const post = await post.findByIdAndDelete(req.params.id)

    if (!post) {
      res.status(404).send()
    }

    res.send(post)
  } catch (e) {
    res.status(500).send()
  }
})

module.exports = posts