const Router = require('koa-router')
const User = require('../models/user')
const authn = require('../middleware/auth')
const multer = require('koa-multer')
const upload = new Router()

// To be able to accept file uploads
const file = multer({ 
  limits: {
    fileSize: 500000 //500kb
  },
  fileFilter(req, file, cb) {
    // Using regex to match file types
    if (!file.originalname.match(/\.(jpg|jpeg|doc|docx|png|pdf)$/)) { 
      cb(new Error ('File must be either png, jpg, pdf, doc or docx'))
    }
    // Accept the file
    cb(undefined, true) 
  }
}) 

upload.post('/avatar', authn, file.single('avatar'), async ctx => {
  // save to user collection on DB
  ctx.request.user.avatar = ctx.request.files.buffer 
  await ctx.request.user.save()
  ctx.status = 200
  ctx.body = { status: 'success' }
}, (error, ctx, next) => {
  ctx.throw(400, { error: error.message })
})

upload.post('/delete-avatar', authn, async ctx => {
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