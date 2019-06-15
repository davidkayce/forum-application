const Router = require('koa-router')
const authn = require('../middleware/auth')
const upload = new Router()

upload.post('/avatar', authn, async ctx => {
  console.log(ctx.request.body.files.avatar)
  // ctx.request.user.avatar = ctx.request.body.files.avatar
  // await ctx.request.user.save()
  // ctx.status = 200
  // ctx.body = { status: 'success' }
}, (error, ctx, next) => {
  ctx.throw(400, { error: error.message })
})

upload.post('/delete-avatar', authn, async ctx => {
  console.log(ctx.reques.user)
  ctx.request.user.avatar = undefined 
  await ctx.request.user.save()
  ctx.status = 200
  ctx.body = { status: 'success' }
})

upload.get('/avatar', authn, async ctx => {
  try {
    const user = ctx.request.user
    if(!user.avatar) ctx.throw('There is no avatar')
    ctx.set('Content-Type', 'image/jpg')
    ctx.body = user.avatar
  } catch (error) {
    ctx.status(404)
  }
})

module.exports = upload