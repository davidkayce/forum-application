const Router = require('koa-router')
const User = require('../models/user')
const authn = require('../middleware/auth')
const multer = require('koa-multer')
const upload = new Router()

const file = multer({ // To be able to accept file uploads
  dest: 'uploads/',
  limits: {
    fileSize: 500000 //500kb
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|doc|docx|png|pdf)$/)) { // Using regex to match file types
      cb(new Error ('File must be either png, jpg, pdf, doc or docx'))
    }
    cb(undefined, true) // Accept the file
  }
}) 

upload.post('/avatar', authn, file.single('avatar'), async ctx => {
  ctx.status = 200
}, (error, ctx, next) => {
  ctx.status = 400
  ctx.body = { error: error.message }
})

module.exports = upload