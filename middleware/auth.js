const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (ctx, next) => {
  try {
    const token = ctx.request.header('Authorization').replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.API_PRIVATE)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) // check for a user with the id in the JWT and the right token

    if (!user) {
      throw new Error()
    }
    ctx.request.user = user // storing the verified user object 
    next() // carry on with the routes
  } catch (error) {
    ctx.status = 401
    ctx.body = "You are not authorized to access this route"
  }
}

module.exports = auth