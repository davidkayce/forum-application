const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (ctx, next) => {
  try {
    const token = ctx.request.header['authorization'].replace('Bearer ', '')
    const decoded = await jwt.verify(token, process.env.API_PRIVATE)
    // check for a user with the id in the JWT and the right token
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token }) 

    if (!user) ctx.throw(404, 'These authentication deatils are invalid')
    ctx.request.token = token
    ctx.request.user = user 
    return next() 
  } catch (error) {
    ctx.throw(401, 'You are not authorized to access this route')
  }
}

module.exports = auth