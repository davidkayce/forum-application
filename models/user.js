const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Create a schema of sort that defines different values and their conditons 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
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
  }
})

// Encryption middleware placed before each save
userSchema.pre('save', async function (next) { // we did not use an arrow function hereause we want to access the "this" property
  const user = this
  if (user.isModified('password')) { // this checks if the user password property is being changed 
    user.password = await bcrypt.hash(user.password, 10)
  }
  next()
})


// Authentication Middleware through custom function 'createCredentials'
// npm i jsonwebtoken@latest
userSchema.statics.checkCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if (!user) {
    throw new Error('This user does not exist')
  }
  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    throw new Error('The supplied credentials are incorrect')
  }
  const token = jwt.sign({user._id }, 'secret')
  return user
}

const User = mongoose.model('User', userSchema)

module.exports = User