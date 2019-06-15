const Router = require('koa-router')
const User = require('../models/user')
const authn = require('../middleware/auth')
const multer = require('koa-multer')
const upload = new Router()

const file = multer({ // To be able to accept file uploads
  limits: {
    fileSize: 500000 //500kb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|doc|docx|png|pdf)$/)) { // Using regex to match file types
      cb(new Error ('File must be either png, jpg, pdf, doc or docx'))
      cb(undefined, false)
    }
    cb(undefined, true) // Accept the file
  }
}) 

upload.post('/avatar', authn, file.single('avatar'), async ctx => {
  ctx.request.user.avatar = ctx.request.files.buffer // save to user collection on DB
  await ctx.request.user.save()
  ctx.status = 200
}, (error, ctx, next) => {
  ctx.status = 400
  ctx.body = { error: error.message }
})

upload.post('/delete-avatar', authn, async ctx => {
  ctx.request.user.avatar = undefined // delete current 
  await ctx.request.user.save()
  ctx.status = 200
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