const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Post = require('./posts')

// Create a schema of sort that defines different values and their conditons 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) { // Here we check if it is an email and throw an error if it is not
        throw new Error('Email is invalid')
      }
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
    trim: true,
    validate(value) {
      if (value.toLowerCase().includes('password')) { // You can have various checks, here we are validating if the password contains "password"
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 16) {
        throw new Error('You are not old enough to use this app')
      }
    }
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
})

userSchema.virtual('posts', {
  ref: 'Post',
  localField: '_id',
  foreignField: 'author'
})


// Methods are functions on the user constructor, here this === user
// API token authentication
userSchema.methods.generateToken = async function () {
  const user = this
  // Generate user token and set expiry
  const token = jwt.sign({ _id: user._id.toString() }, process.env.API_PRIVATE, { expiresInMinutes: process.env.API_LIFETIME })
  user.tokens = user.tokens.concat({ token }) 
  await user.save()
  return token
}

userSchema.methods.refreshToken = async function () {
  const user = this
  // Generate refresh tokens and set expiry (for a mobile kind of use case)
  // This is used in webapps to always keep the user logged in
  const refreshToken = jwt.sign({ _id: user._id.toString() }, process.env.API_REFRESH, { expiresInMinutes: process.env.REFRESH_LIFETIME })
  return refreshToken
}

// To limit the information spit out when you call a user
userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

// Statics are functions on the user  instance not the user constructor, here this != user
// Authentication Middleware through custom function 'createCredentials'
userSchema.statics.checkCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('This user does not exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('The supplied credentials are incorrect')
  }
  return user
}


// Mongo Hooks
// Encryption middleware placed before each save
userSchema.pre('save', async function (next) { // we did not use an arrow function hereause we want to access the "this" property
  const user = this
  if (user.isModified('password')) { // this checks if the user password property is being changed 
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})

// Delete user posts when user is deleted
userSchema.pre('remove', async function (next) {
  const user = this
  await Post.deleteMany({ author: user._id })
  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
